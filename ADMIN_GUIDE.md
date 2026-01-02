# Sistema de Administración - Dulce Hogar

## 🔒 SEGURIDAD

El panel de administración ahora está **protegido con contraseña**.

### Credenciales por Defecto
- **Contraseña:** `dulcehogar2026`
- **Duración de sesión:** 24 horas

### Cambiar la Contraseña
1. Abre el archivo `lib/auth.ts`
2. Busca la línea: `const ADMIN_PASSWORD = 'dulcehogar2026';`
3. Cambia `'dulcehogar2026'` por tu contraseña deseada
4. Guarda el archivo

### Cerrar Sesión
- Haz clic en el botón "Cerrar Sesión" en el panel de admin
- O espera 24 horas para que la sesión expire automáticamente

## 🎯 Resumen

Se ha implementado un sistema completo de administración para tu sitio web que te permite controlar todo el contenido dinámicamente sin necesidad de editar código.

## 🚀 Acceso al Panel de Administración

1. **Visita** `/admin/login` o haz clic en el ícono de configuración (⚙️) en el header (solo visible si estás autenticado)
2. **Ingresa la contraseña:** `dulcehogar2026` (por defecto)
3. **Accede** al panel de administración

**Nota:** El ícono de admin solo es visible para usuarios autenticados, manteniéndolo oculto para visitantes comunes.

## 📋 Funcionalidades

### 1. Gestión de Productos (`/admin/productos`)
- ✅ Agregar nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Establecer categorías
- ✅ Definir precios e imágenes

**Campos:**
- Nombre del producto
- Descripción
- Precio (S/)
- URL de la imagen
- Categoría (opcional)

### 2. Gestión de Galería (`/admin/galeria`)
- ✅ Agregar imágenes a la galería
- ✅ Organizar por categorías (Bodas, Cumpleaños, etc.)
- ✅ Eliminar imágenes
- ✅ Preview de imágenes

**Categorías disponibles:**
- Todas
- Bodas
- Cumpleaños
- Comunión
- Corporativo
- Baby Shower

### 3. Gestión de Promociones (`/admin/promociones`)
- ✅ Crear promociones de descuento
- ✅ Crear promociones especiales/temporada
- ✅ Activar/desactivar promociones
- ✅ Editar promociones existentes
- ✅ Eliminar promociones

**Tipos de promoción:**
- **Descuento:** Con porcentaje, código de cupón y fecha de vencimiento
- **Especial/Temporada:** Para eventos especiales o temporadas

**Campos comunes:**
- Título
- Descripción
- Texto del botón CTA
- Enlace del botón
- Estado (Activo/Inactivo)

### 4. Configuración del Sitio (`/admin/configuracion`)
- ✅ Mostrar/ocultar secciones completas
- ✅ Personalizar banner de urgencia
- ✅ Control de visibilidad en tiempo real

**Secciones controlables:**
- Hero (Banner Principal)
- Sobre Nosotros
- Productos Destacados
- Promociones
- Galería de Creaciones
- Testimonios/Reseñas
- Feed de Instagram

**Banner de Urgencia:**
- Activar/desactivar
- Mensaje personalizado
- Días y horas restantes

**Popup de Oferta (Exit Intent):**
- Activar/desactivar popup
- Porcentaje de descuento
- Código de cupón
- Monto mínimo de compra
- Vista previa en tiempo real

### 5. Gestión de Reseñas (`/admin/reviews`)
- Ya existía anteriormente
- Aprobar/rechazar reseñas de clientes

## 🎨 Cambios en la Página Principal

### Sin Reseñas
Cuando no hay reseñas aprobadas, se muestra:
- ❌ Ya NO hay testimoniales ficticios
- ✅ Mensaje: "Aún no hay reseñas"
- ✅ Botón destacado: "Dejar la Primera Reseña"
- ✅ Diseño atractivo invitando a dejar opinión

### Con Reseñas
- Se muestran las reseñas aprobadas
- Botón para agregar más reseñas

### Secciones Dinámicas
Todas las secciones ahora respetan la configuración:
- Si está desactivada en admin, no se muestra
- Si está activada, se muestra con el contenido actualizado

## 💾 Almacenamiento

Los datos se guardan en **localStorage** del navegador:
- `dulcehogar_products` - Productos
- `dulcehogar_gallery` - Imágenes de galería
- `dulcehogar_promotions` - Promociones
- `dulcehogar_config` - Configuración del sitio (incluye popup)
- `dulcehogar_admin_auth` - Token de autenticación (expira en 24h)

## 📝 Cómo Usar

### Agregar un Producto
1. Ve a `/admin/productos`
2. Completa el formulario con los datos
3. Haz clic en "Agregar Producto"
4. El producto aparecerá automáticamente en el sitio

### Ocultar una Sección
1. Ve a `/admin/configuracion`
2. Encuentra la sección que quieres ocultar
3. Haz clic en el botón para cambiar a "Oculto"
4. Haz clic en "Guardar Configuración"
5. Recarga la página principal para ver los cambios

### Crear una Promoción
1. Ve a `/admin/promociones`
2. Selecciona el tipo (Descuento o Especial)
3. Completa los campos
4. Marca "Promoción activa" si quieres que se muestre
5. Haz clic en "Crear Promoción"

### Agregar Imágenes a la Galería
1. Primero, sube tus imágenes a `/public/images/galeria/`
2. Ve a `/admin/galeria`
3. Copia la ruta de la imagen (ej: `/images/galeria/torta1.jpg`)
4. Completa el formulario con la URL, título y categoría
5. Haz clic en "Agregar a Galería"

### Configurar el Popup de Oferta
1. Ve a `/admin/configuracion`
2. Desplázate a la sección "Popup de Oferta (Exit Intent)"
3. Activa o desactiva el popup
4. Configura el porcentaje de descuento, código y monto mínimo
5. Verás una vista previa del mensaje
6. Haz clic en "Guardar Configuración"

## ⚠️ Notas Importantes

1. **Seguridad:** El panel está protegido con contraseña. Cambia la contraseña por defecto en producción.
2. **Sesión:** La sesión expira en 24 horas. Deberás volver a iniciar sesión.
3. **Imágenes:** Debes subir las imágenes manualmente a la carpeta `public/images/` antes de usarlas
4. **Persistencia:** Los datos se guardan en el navegador. Si borras los datos del navegador, perderás la configuración
5. **Recarga:** Después de hacer cambios, recarga la página principal para verlos reflejados
6. **Producción:** Para un sitio en producción, considera migrar a una base de datos real y usar NextAuth.js

## 🔄 Resetear Configuración

Si quieres volver a los valores por defecto:
1. Abre la consola del navegador (F12)
2. Ejecuta:
```javascript
localStorage.removeItem('dulcehogar_products');
localStorage.removeItem('dulcehogar_gallery');
localStorage.removeItem('dulcehogar_promotions');
localStorage.removeItem('dulcehogar_config');
localStorage.removeItem('dulcehogar_admin_auth'); // Cierra sesión
```
3. Recarga la página

## 🎯 Próximos Pasos Recomendados

Para un sitio en producción, considera:
1. **Cambiar la contraseña por defecto** en `lib/auth.ts`
2. Implementar autenticación robusta con **NextAuth.js** o **Supabase Auth**
3. Migrar de localStorage a una base de datos (Supabase, Firebase, MongoDB, etc.)
4. Agregar subida de archivos para imágenes (Cloudinary, Uploadcare, etc.)
5. Implementar backup automático de configuración
6. Agregar roles de usuario (admin, editor, etc.)

## 📧 Soporte

Si tienes preguntas o necesitas ayuda, consulta la documentación de Next.js o contacta al desarrollador.
