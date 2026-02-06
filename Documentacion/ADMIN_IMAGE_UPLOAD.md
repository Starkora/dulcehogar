# Guía de Carga de Imágenes - Admin Panel

## Descripción General

El panel de administración permite cargar imágenes de dos formas:
1. **Subir archivos** directamente desde tu computadora → Se almacenan en **Cloudinary**
2. **Ingresar URL** de imágenes existentes (locales o externas)

Esta funcionalidad está disponible en:
- **Productos**: Para la imagen principal del producto
- **Galería**: Para las imágenes de la galería

## Almacenamiento en Cloudinary

Las imágenes subidas se guardan en **Cloudinary**, un servicio de almacenamiento en la nube que ofrece:
- ✅ CDN global para carga rápida
- ✅ Optimización automática de imágenes
- ✅ Conversión a WebP cuando el navegador lo soporte
- ✅ Sin límites de almacenamiento del servidor
- ✅ Perfecto para producción

**Ver la guía completa**: [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md)

## Cómo Subir Imágenes

### Opción 1: Subir un Archivo (Recomendado)

1. Haz clic en el área de carga que dice "Haz clic o arrastra una imagen aquí"
2. Selecciona una imagen desde tu computadora
3. La imagen se subirá automáticamente a **Cloudinary**
4. Verás una vista previa y la URL se completará automáticamente
5. La imagen estará disponible globalmente mediante CDN

**Formatos Aceptados:**
- JPEG/JPG
- PNG
- GIF
- WEBP

**Límite de Tamaño:** 5MB por imagen

**Ejemplo de URL generada:**
```
https://res.cloudinary.com/tu-cloud-name/image/upload/v1234567890/dulcehogar/productos/imagen.jpg
```

### Opción 2: Ingresar URL

1. Haz clic en "Ingresar URL en su lugar"
2. Pega la URL completa de la imagen
3. Puede ser:
   - Una URL de Cloudinary existente
   - Una imagen de tu carpeta `public/images`
   - Una URL externa de otro servidor
4. Ejemplos:
   - `/images/productos/torta-chocolate.jpg` (local)
   - `https://res.cloudinary.com/...` (Cloudinary)
   - `https://example.com/imagen.jpg` (externa)

## Dónde se Guardan las Imágenes

### Imágenes Subidas (Opción 1)
Las imágenes se almacenan en **Cloudinary** organizadas por carpetas:

```
cloudinary.com/tu-cuenta/
└── dulcehogar/
    ├── productos/      # Imágenes de productos
    └── galeria/        # Imágenes de galería
```

**Ventajas:**
- No ocupan espacio en tu servidor
- Carga rápida desde cualquier parte del mundo
- Optimización automática de calidad y formato
- Respaldadas y seguras

### Imágenes por URL (Opción 2)
Depende de dónde esté alojada la imagen:
- URLs locales (`/images/...`): En tu carpeta `public/`
- URLs externas: En el servidor que especifiques

## Vista Previa

Después de subir una imagen o ingresar una URL:
- Verás una vista previa de la imagen
- Puedes hacer clic en "Eliminar" (🗑️) para borrar la imagen y seleccionar otra
- El botón para cambiar entre "Subir archivo" y "Ingresar URL" está siempre disponible

## Configuración Requerida

Para que las subidas funcionen, necesitas configurar Cloudinary:

1. Crea una cuenta gratuita en [Cloudinary](https://cloudinary.com/users/register/free)
2. Obtén tus credenciales del Dashboard
3. Crea un archivo `.env.local` con:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
   CLOUDINARY_API_KEY=tu-api-key
   CLOUDINARY_API_SECRET=tu-api-secret
   ```
4. Reinicia el servidor: `npm run dev`

**Guía completa**: Ver [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) con instrucciones paso a paso.

## Solución de Problemas

### Error: "Cloudinary no está configurado"
- Verifica que las 3 variables estén en `.env.local`
- Asegúrate de reiniciar el servidor después de agregarlas
- Confirma que no haya espacios extras en los valores

### La imagen no se carga
- Verifica que el tamaño sea menor a 5MB
- Asegúrate de que el formato sea JPEG, PNG, GIF o WEBP
- Comprueba tu conexión a internet

### La URL no muestra la imagen
- Verifica que la URL sea correcta
- Si es una URL externa, asegúrate de que la imagen sea accesible públicamente
- Si es una URL local, verifica que la imagen exista en la carpeta `public`

### Error al subir a Cloudinary
- Verifica que tu cuenta de Cloudinary esté activa
- Revisa que las credenciales sean correctas
- Confirma que no hayas excedido el límite del plan gratuito (25GB/mes)
- Consulta la consola del navegador para ver el error específico

## Consideraciones Técnicas

### Almacenamiento Actual
El sistema usa **Cloudinary** como almacenamiento principal:
- ✅ **Listo para producción**: Funciona en Vercel, Netlify, etc.
- ✅ **Sin límites de servidor**: No usa el sistema de archivos
- ✅ **CDN incluido**: Carga rápida globalmente
- ✅ **Optimización automática**: WebP, compresión inteligente
- ✅ **Plan gratuito generoso**: 25GB almacenamiento + 25GB bandwidth

### Plan Gratuito de Cloudinary
Incluye:
- 25 GB de almacenamiento
- 25 GB de ancho de banda mensual
- 25,000 transformaciones por mes
- Imágenes ilimitadas

**Es más que suficiente para un sitio de repostería pequeño/mediano.**

### Alternativas (si necesitas cambiar)
Si en el futuro necesitas otro proveedor:
- **AWS S3**: Más escalable pero más complejo
- **Vercel Blob**: Integración nativa con Vercel
- **Supabase Storage**: Si ya usas Supabase

## Características de Optimización

Cloudinary optimiza automáticamente tus imágenes:

1. **Límite de dimensiones**: Máximo 1200x1200px
2. **Calidad automática**: Se ajusta según el dispositivo y conexión
3. **Formato automático**: Convierte a WebP en navegadores compatibles
4. **CDN global**: Entrega desde el servidor más cercano al usuario

## Mejoras Futuras Sugeridas

1. **Múltiples imágenes**: Permitir subir varias imágenes a la vez
2. **Edición de imágenes**: Recortar, rotar, ajustar antes de guardar
3. **Galería de medios**: Ver todas las imágenes subidas en un solo lugar dentro del admin
4. **Transformaciones personalizadas**: Aplicar filtros o efectos específicos
5. **Gestión avanzada**: Renombrar, mover a otras carpetas, etiquetar imágenes

## Recursos Adicionales

- [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) - Guía completa de configuración
- [Cloudinary Documentation](https://cloudinary.com/documentation) - Documentación oficial
- [Image Transformations](https://cloudinary.com/documentation/image_transformations) - Transformaciones avanzadas
