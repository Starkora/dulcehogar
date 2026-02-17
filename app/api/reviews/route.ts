import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface ReviewRow {
  id: string;
  name: string;
  rating: number;
  comment: string;
  event: string;
  status: 'pending' | 'approved' | 'rejected';
  ipHash: string | null;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// GET - Obtener reseñas (solo aprobadas por defecto)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'approved';
    
    let query = 'SELECT * FROM reviews';
    const params: any[] = [];
    
    if (status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY createdAt DESC';
    
    const reviews = await executeQuery<ReviewRow>(query, params);
    
    return NextResponse.json(reviews);
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al cargar reseñas' }, { status: 500 });
  }
}

// POST - Crear nueva reseña
export async function POST(request: Request) {
  try {
    const review = await request.json();
    
    // Validación básica
    if (!review.name || !review.rating || !review.comment || !review.event) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    if (review.rating < 1 || review.rating > 5) {
      return NextResponse.json({ error: 'Rating debe estar entre 1 y 5' }, { status: 400 });
    }

    // Detectar spam
    if (review.comment.length < 15) {
      return NextResponse.json({ error: 'El comentario es muy corto' }, { status: 400 });
    }

    // Obtener IP hash (simple - en producción usar una librería)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const ipHash = Buffer.from(ip).toString('base64').substring(0, 32);

    const result = await executeQuery(
      `INSERT INTO reviews (id, name, rating, comment, event, status, ipHash, photoUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `review-${Date.now()}`,
        review.name,
        review.rating,
        review.comment,
        review.event,
        'pending', // Todas las reseñas empiezan como pendientes
        ipHash,
        review.photoUrl || null
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reseña enviada. Será publicada después de revisión.',
      result 
    });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al crear reseña' }, { status: 500 });
  }
}

// PATCH - Actualizar estado de reseña (aprobar/rechazar)
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    await executeQuery(
      'UPDATE reviews SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );
    
    return NextResponse.json({ success: true, message: 'Reseña actualizada' });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al actualizar reseña' }, { status: 500 });
  }
}

// DELETE - Eliminar reseña
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await executeQuery('DELETE FROM reviews WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true, message: 'Reseña eliminada' });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error al eliminar reseña' }, { status: 500 });
  }
}
