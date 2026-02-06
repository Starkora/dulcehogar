// Configuración de conexión a TiDB Cloud
import { connect } from '@tidbcloud/serverless';

// Crear conexión usando la URL completa
export const getConnection = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está configurada en las variables de entorno');
  }
  
  return connect({ url: process.env.DATABASE_URL });
};

// Helper para ejecutar queries de forma segura
export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  const conn = getConnection();
  
  try {
    const result = await conn.execute(query, params);
    // El resultado puede ser Row[] directamente o un objeto con rows
    if (Array.isArray(result)) {
      return result as T[];
    }
    return (result.rows || []) as T[];
  } catch (error) {
    console.error('Error ejecutando query:', error);
    throw error;
  }
}

// Tipos para las tablas
export type ProductRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string | null;
  isReferenceImage: boolean;
  isApproximatePrice: boolean;
  unitType: 'unidad' | 'paquete' | 'docena' | 'kilo' | 'porcion';
  quantity: number;
  servings: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type EventProductRow = {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  unitType: 'unidad' | 'paquete' | 'docena' | 'kilo' | 'porcion';
  quantity: number;
  servings: number | null;
  status: 'active' | 'inactive' | 'archived';
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SpecialEventRow = {
  id: string;
  name: string;
  isActive: boolean;
  eventDate: string;
  startDate: string;
  endDate: string;
  headerButton_show: boolean;
  headerButton_text: string | null;
  headerButton_url: string | null;
  banner_title: string | null;
  banner_description: string | null;
  banner_ctaText: string | null;
  popup_enabled: boolean;
  popup_discount: number | null;
  popup_code: string | null;
  popup_minAmount: number | null;
  urgencyTimer_show: boolean;
  urgencyTimer_deadline: Date | null;
  urgencyTimer_hoursLeft: number | null;
  limitedSlots_show: boolean;
  limitedSlots_slots: number | null;
  limitedSlots_message: string | null;
  createdAt: Date;
  updatedAt: Date;
};
