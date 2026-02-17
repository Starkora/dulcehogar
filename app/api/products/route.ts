import { NextResponse } from 'next/server';
import { executeQuery, ProductRow } from '@/lib/db';

export async function GET() {
  try {
    const products = await executeQuery<ProductRow>(
      'SELECT * FROM products ORDER BY createdAt DESC'
    );
    
    return NextResponse.json(products);
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al cargar productos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    
    const result = await executeQuery(
      `INSERT INTO products (id, name, description, price, image, category, isReferenceImage, isApproximatePrice, unitType, quantity, servings)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `prod-${Date.now()}`,
        product.name,
        product.description,
        product.price,
        product.image,
        product.category || null,
        product.isReferenceImage || false,
        product.isApproximatePrice || false,
        product.unitType || 'unidad',
        product.quantity || 1,
        product.servings || null
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const product = await request.json();
    
    if (!product.id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }
    
    const result = await executeQuery(
      `UPDATE products 
       SET name = ?, description = ?, price = ?, image = ?, category = ?, 
           isReferenceImage = ?, isApproximatePrice = ?, unitType = ?, quantity = ?, servings = ?
       WHERE id = ?`,
      [
        product.name,
        product.description,
        product.price,
        product.image,
        product.category || null,
        product.isReferenceImage || false,
        product.isApproximatePrice || false,
        product.unitType || 'unidad',
        product.quantity || 1,
        product.servings || null,
        product.id
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
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
      'DELETE FROM products WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}