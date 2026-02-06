import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'DulceHogar@2026VMT';
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production';

// Generar un token de sesión seguro
function generateSessionToken(password: string): string {
  const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 horas
  const sessionData = {
    authenticated: true,
    expires,
    hash: crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(password + expires.toString())
      .digest('hex'),
  };
  
  return Buffer.from(JSON.stringify(sessionData)).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Contraseña requerida' },
        { status: 400 }
      );
    }

    // Verificar contraseña
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Crear token de sesión
    const sessionToken = generateSessionToken(password);

    // Crear respuesta con cookie HTTP-only
    const response = NextResponse.json(
      { success: true, message: 'Autenticación exitosa' },
      { status: 200 }
    );

    // Establecer cookie segura
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'strict', // Protección CSRF
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
