# Sistema de Autenticación Seguro para Admin

## 📋 Cambios Realizados

### ✅ Problema Resuelto
Antes, el sistema usaba `localStorage` para la autenticación, lo que significaba:
- **Cualquier persona en el mismo navegador podía acceder al admin**
- No había verificación del lado del servidor
- La contraseña estaba en el código del cliente (inseguro)
- Las APIs no verificaban autenticación

### 🔐 Nueva Solución

Ahora el sistema usa **cookies HTTP-only** con verificación del servidor:

1. **Sesiones individuales**: Cada usuario tiene su propia sesión segura
2. **Cookies HTTP-only**: No accesibles desde JavaScript del navegador
3. **Middleware**: Protege todas las rutas de admin automáticamente
4. **Variables de entorno**: Contraseña almacenada de forma segura

## 📁 Archivos Creados/Modificados

### Nuevos Archivos:
- `middleware.ts` - Protege rutas de admin
- `app/api/auth/login/route.ts` - API para iniciar sesión
- `app/api/auth/logout/route.ts` - API para cerrar sesión
- `app/api/auth/check/route.ts` - API para verificar autenticación

### Archivos Modificados:
- `lib/auth.ts` - Sistema de autenticación actualizado
- `app/admin/login/page.tsx` - Página de login actualizada
- Todas las páginas de admin (`productos`, `galeria`, `promociones`, etc.) - Ahora usan autenticación async

### Variables de Entorno:
```env
ADMIN_PASSWORD=DulceHogar@2026VMT
SESSION_SECRET=tu-secreto-aleatorio-seguro
```

## 🚀 Cómo Usar

### 1. Configurar Variables de Entorno

El archivo `.env.local` ya está configurado con:
```env
ADMIN_PASSWORD=DulceHogar@2026VMT
SESSION_SECRET=48f7c3c5e8a2b4d6f1e9a7c3b2d4e6f8a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1
```

**⚠️ Para producción:** Genera un nuevo `SESSION_SECRET` ejecutando:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Reiniciar el Servidor

```bash
npm run dev
```

### 3. Iniciar Sesión

1. Ve a: `http://localhost:3000/admin/login`
2. Ingresa la contraseña: `DulceHogar@2026VMT`
3. Serás redirigido al panel de administración

## 🔒 Seguridad

### Características de Seguridad:

✅ **Cookies HTTP-only**: No accesibles desde JavaScript
✅ **Cookies SameSite=Strict**: Protección contra CSRF
✅ **Cookies Secure en producción**: Solo HTTPS
✅ **Expiración de sesión**: 24 horas
✅ **Middleware de protección**: Rutas bloqueadas automáticamente
✅ **Contraseña en variables de entorno**: No en el código
✅ **Hash de sesión**: Tokens firmados con HMAC

### Protección de Rutas:

El middleware protege automáticamente:
- Todas las rutas `/admin/*`
- Todas las APIs `/api/*` que contienen "admin"

Si un usuario no está autenticado:
- Rutas de página: Redirige a `/admin/login`
- Rutas de API: Retorna error 401

## 🔄 Flujo de Autenticación

```
1. Usuario ingresa contraseña
   ↓
2. POST /api/auth/login
   ↓
3. Servidor verifica contraseña
   ↓
4. Genera token de sesión con hash HMAC
   ↓
5. Establece cookie HTTP-only segura
   ↓
6. Middleware verifica cookie en cada request
   ↓
7. Si es válida: Permite acceso
   Si es inválida: Redirige a login
```

## 🧪 Probar la Seguridad

### Test 1: Sesiones Independientes
1. Abre el sitio en Chrome
2. Inicia sesión como admin
3. Abre el sitio en Firefox (o modo incógnito)
4. **Resultado esperado**: Firefox NO está autenticado

### Test 2: Cookie HTTP-only
1. Inicia sesión en el admin
2. Abre DevTools > Application > Cookies
3. Busca la cookie `admin_session`
4. **Resultado esperado**: Tiene el flag "HttpOnly" ✓

### Test 3: Protección de Middleware
1. Cierra sesión
2. Intenta acceder directamente a `/admin`
3. **Resultado esperado**: Redirige a `/admin/login`

### Test 4: Expiración de Sesión
1. Inicia sesión
2. Espera 24 horas (o modifica el código para reducir tiempo)
3. Recarga la página
4. **Resultado esperado**: Redirige a login

## 📝 Cambiar la Contraseña

### Opción 1: Variables de Entorno (Recomendado)
Edita `.env.local`:
```env
ADMIN_PASSWORD=TuNuevaContraseñaSegura123!
```

### Opción 2: En el Código
Edita `app/api/auth/login/route.ts` línea 4:
```typescript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TuNuevaContraseña';
```

**⚠️ Siempre usa variables de entorno en producción**

## 🌐 Despliegue en Producción

### Vercel / Netlify / Otros:

1. **Configura las variables de entorno** en tu plataforma:
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `DATABASE_URL`
   - Cloudinary vars...

2. **Verifica que HTTPS esté habilitado** (casi todos los servicios lo tienen por defecto)

3. **Las cookies `secure` se activarán automáticamente** en producción

## 🆘 Solución de Problemas

### "No puedo iniciar sesión"
- Verifica que `.env.local` existe y tiene `ADMIN_PASSWORD`
- Reinicia el servidor: `npm run dev`
- Revisa la consola del navegador para errores

### "Me redirige a login constantemente"
- Limpia las cookies del navegador
- Intenta en modo incógnito
- Verifica que no haya errores en el middleware

### "Funciona en local pero no en producción"
- Verifica que las variables de entorno estén configuradas en tu plataforma
- Verifica que HTTPS esté habilitado
- Revisa los logs del servidor

## 📚 Recursos Adicionales

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [HTTP-only Cookies](https://developer.mozilla.org/es/docs/Web/HTTP/Cookies)
- [CSRF Protection](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

## 🔮 Mejoras Futuras

Si necesitas un sistema más robusto:
- **NextAuth.js**: Sistema completo de autenticación
- **Multi-usuarios**: Base de datos de usuarios
- **Roles y permisos**: Admin, Editor, Viewer
- **2FA**: Autenticación de dos factores
- **OAuth**: Login con Google/Facebook

---

**✅ Sistema implementado y funcionando correctamente**
