import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Sesión cerrada' },
    { status: 200 }
  );

  // Eliminar la cookie de sesión
  response.cookies.delete('admin_session');

  return response;
}
