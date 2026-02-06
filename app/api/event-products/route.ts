import { NextResponse } from 'next/server';
import { executeQuery, EventProductRow } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    
    let query = 'SELECT * FROM event_products WHERE status = ?';
    const params: any[] = ['active'];
    
    if (eventId) {
      query += ' AND eventId = ?';
      params.push(eventId);
    }
    
    query += ' ORDER BY displayOrder ASC, createdAt DESC';
    
    const products = await executeQuery<EventProductRow>(query, params);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching event products:', error);
    return NextResponse.json({ error: 'Error al cargar productos del evento' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    
    const result = await executeQuery(
      `INSERT INTO event_products (id, eventId, name, description, price, originalPrice, image, unitType, quantity, servings, status, displayOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `ev-prod-${Date.now()}`,
        product.eventId,
        product.name,
        product.description,
        product.price,
        product.originalPrice || null,
        product.image,
        product.unitType || 'unidad',
        product.quantity || 1,
        product.servings || null,
        product.status || 'active',
        product.displayOrder || 0
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error creating event product:', error);
    return NextResponse.json({ error: 'Error al crear producto de evento' }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const product = await request.json();
    
    if (!product.id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }
    
    const result = await executeQuery(
      `UPDATE event_products 
       SET eventId = ?, name = ?, description = ?, price = ?, originalPrice = ?, 
           image = ?, unitType = ?, quantity = ?, servings = ?, status = ?, displayOrder = ?
       WHERE id = ?`,
      [
        product.eventId,
        product.name,
        product.description,
        product.price,
        product.originalPrice || null,
        product.image,
        product.unitType || 'unidad',
        product.quantity || 1,
        product.servings || null,
        product.status || 'active',
        product.displayOrder || 0,
        product.id
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error updating event product:', error);
    return NextResponse.json({ error: 'Error al actualizar producto de evento' }, { status: 500 });
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
      'DELETE FROM event_products WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting event product:', error);
    return NextResponse.json({ error: 'Error al eliminar producto de evento' }, { status: 500 });
  }
}