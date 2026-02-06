import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface GalleryImageRow {
  id: string;
  url: string;
  alt: string;
  category: string | null;
  createdAt: Date;
}

export async function GET() {
  try {
    const images = await executeQuery<GalleryImageRow>(
      'SELECT * FROM gallery_images ORDER BY createdAt DESC'
    );
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ error: 'Error al cargar imágenes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const image = await request.json();
    
    const result = await executeQuery(
      `INSERT INTO gallery_images (id, url, alt, category)
       VALUES (?, ?, ?, ?)`,
      [
        `img-${Date.now()}`,
        image.url,
        image.alt,
        image.category || null
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json({ error: 'Error al crear imagen' }, { status: 500 });
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
      'DELETE FROM gallery_images WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json({ error: 'Error al eliminar imagen' }, { status: 500 });
  }
}
