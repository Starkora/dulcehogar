// Sistema simple de autenticación para el admin
// NOTA: Para producción, usa un sistema de autenticación real como NextAuth.js

const ADMIN_PASSWORD = 'DulceHogar@2026VMT'; // Cambia esto por tu contraseña
const AUTH_KEY = 'dulcehogar_admin_auth';

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, 'authenticated');
      // Expira en 24 horas
      const expiry = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem(AUTH_KEY + '_expiry', expiry.toString());
    }
    return true;
  }
  return false;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY + '_expiry');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const auth = localStorage.getItem(AUTH_KEY);
  const expiry = localStorage.getItem(AUTH_KEY + '_expiry');
  
  if (!auth || !expiry) return false;
  
  // Verificar si ha expirado
  if (Date.now() > parseInt(expiry)) {
    logout();
    return false;
  }
  
  return auth === 'authenticated';
};

export const requireAuth = (callback: () => void) => {
  if (isAuthenticated()) {
    callback();
  } else {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  }
};
