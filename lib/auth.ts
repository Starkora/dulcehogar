// Sistema de autenticación basado en cookies HTTP-only del servidor
// Más seguro que localStorage ya que cada sesión es individual

export const login = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error en login:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  } catch (error) {
    console.error('Error en logout:', error);
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/check');
    return response.ok;
  } catch {
    return false;
  }
};

export const requireAuth = async (callback: () => void) => {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    callback();
  } else {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  }
};
