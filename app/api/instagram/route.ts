import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface InstagramPostRow {
  id: string;
  imageUrl: string;
  caption: string;
  link: string | null;
  likes: number;
  createdAt: Date;
}

export async function GET() {
  try {
    const posts = await executeQuery<InstagramPostRow>(
      'SELECT * FROM instagram_posts ORDER BY createdAt DESC'
    );
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json({ error: 'Error al cargar posts de Instagram' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const post = await request.json();
    
    const result = await executeQuery(
      `INSERT INTO instagram_posts (id, imageUrl, caption, link, likes)
       VALUES (?, ?, ?, ?, ?)`,
      [
        `ig-${Date.now()}`,
        post.imageUrl,
        post.caption,
        post.link || null,
        post.likes || 0
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error creating Instagram post:', error);
    return NextResponse.json({ error: 'Error al crear post de Instagram' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const post = await request.json();
    
    if (!post.id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }
    
    const result = await executeQuery(
      `UPDATE instagram_posts 
       SET imageUrl = ?, caption = ?, link = ?, likes = ?
       WHERE id = ?`,
      [
        post.imageUrl,
        post.caption,
        post.link || null,
        post.likes || 0,
        post.id
      ]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error updating Instagram post:', error);
    return NextResponse.json({ error: 'Error al actualizar post de Instagram' }, { status: 500 });
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
      'DELETE FROM instagram_posts WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting Instagram post:', error);
    return NextResponse.json({ error: 'Error al eliminar post de Instagram' }, { status: 500 });
  }
}
