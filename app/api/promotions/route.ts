import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface PromotionRow {
  id: string;
  title: string;
  description: string;
  discount: number | null;
  code: string | null;
  validUntil: Date | null;
  isActive: boolean;
  createdAt: Date;
}

export async function GET() {
  try {
    const promotions = await executeQuery<PromotionRow>(
      'SELECT * FROM promotions ORDER BY createdAt DESC'
    );
    
    // Mapear discount a discountPercent para el frontend
    const mapped = promotions.map(p => ({
      ...p,
      discountPercent: p.discount
    }));
    
    return NextResponse.json(mapped);
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al cargar promociones' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const promo = await request.json();
    
    const result = await executeQuery(
      `INSERT INTO promotions (id, title, description, discount, code, validUntil, isActive, type, ctaText, ctaLink)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `promo-${Date.now()}`,
        promo.title,
        promo.description,
        promo.discountPercent || null,
        promo.code || null,
        promo.validUntil || null,
        promo.isActive !== false,
        'discount',
        'Ver Oferta',
        '/contacto'
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al crear promoción' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const promo = await request.json();
    
    if (!promo.id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }
    
    const result = await executeQuery(
      `UPDATE promotions 
       SET title = ?, description = ?, discount = ?, code = ?, validUntil = ?, isActive = ?, type = ?, ctaText = ?, ctaLink = ?
       WHERE id = ?`,
      [
        promo.title,
        promo.description,
        promo.discountPercent || null,
        promo.code || null,
        promo.validUntil || null,
        promo.isActive !== false,
        'discount',
        'Ver Oferta',
        '/contacto',
        promo.id
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al actualizar promoción' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }
    
    const result = await executeQuery(
      'DELETE FROM promotions WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al eliminar promoción' }, { status: 500 });
  }
}
