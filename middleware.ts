import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Rutas de admin que necesitan protección
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Permitir acceso a la página de login
  if (isLoginPage) {
    return NextResponse.next();
  }

  // Proteger rutas de admin
  if (isAdminRoute) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verificar que el token no haya expirado (básico)
    try {
      const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
      if (sessionData.expires < Date.now()) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_session');
        return response;
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Proteger rutas API de admin
  if (isApiRoute && request.nextUrl.pathname.includes('/admin')) {
    const token = request.cookies.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
      const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
      if (sessionData.expires < Date.now()) {
        return NextResponse.json({ error: 'Sesión expirada' }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
};
