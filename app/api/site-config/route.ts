import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface ConfigRow {
  config_key: string;
  config_value: string;
  updatedAt: Date;
}

// GET - Obtener configuración
export async function GET() {
  try {
    const configs = await executeQuery<ConfigRow>(
      'SELECT * FROM site_config'
    );
    
    // Convertir array de configs a objeto
    const configObject: any = {};
    configs.forEach(row => {
      try {
        configObject[row.config_key] = JSON.parse(row.config_value);
      } catch {
        configObject[row.config_key] = row.config_value;
      }
    });
    
    return NextResponse.json(configObject);
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al cargar configuración' }, { status: 500 });
  }
}

// POST - Actualizar configuración completa
export async function POST(request: Request) {
  try {
    const config = await request.json();
    
    // Actualizar o insertar cada clave de configuración
    for (const [key, value] of Object.entries(config)) {
      const jsonValue = JSON.stringify(value);
      
      await executeQuery(
        `INSERT INTO site_config (config_key, config_value) 
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE config_value = ?, updatedAt = CURRENT_TIMESTAMP`,
        [key, jsonValue, jsonValue]
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 });
  }
}

// PUT - Actualizar una clave específica
export async function PUT(request: Request) {
  try {
    const { key, value } = await request.json();
    
    if (!key) {
      return NextResponse.json({ error: 'Clave requerida' }, { status: 400 });
    }
    
    const jsonValue = JSON.stringify(value);
    
    await executeQuery(
      `INSERT INTO site_config (config_key, config_value) 
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE config_value = ?, updatedAt = CURRENT_TIMESTAMP`,
      [key, jsonValue, jsonValue]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 });
  }
}
