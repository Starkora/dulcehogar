# Configuración de Cloudinary para Dulce Hogar

Esta guía te explica cómo configurar Cloudinary para almacenar las imágenes de productos y galería en la nube.

## ¿Por qué Cloudinary?

Cloudinary es ideal para sitios web en producción porque:
- ✅ **CDN Global**: Imágenes rápidas en todo el mundo
- ✅ **Optimización Automática**: Reduce el tamaño sin perder calidad
- ✅ **Formato Automático**: Convierte a WebP cuando el navegador lo soporte
- ✅ **Escalable**: No hay límites de almacenamiento del servidor
- ✅ **Gratis para empezar**: 25 GB de almacenamiento y 25 GB de ancho de banda mensual

## Paso 1: Crear una Cuenta en Cloudinary

1. Ve a [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Regístrate con tu email (también puedes usar GitHub o Google)
3. Confirma tu email
4. Completa el perfil (opcional)

## Paso 2: Obtener las Credenciales

1. Inicia sesión en [https://console.cloudinary.com/](https://console.cloudinary.com/)
2. En el Dashboard verás:
   - **Cloud Name**: Tu identificador único (ej: `dulcehogar-xyz`)
   - **API Key**: Clave pública (ej: `123456789012345`)
   - **API Secret**: Clave secreta (haz clic en "Show" para verla)

![Cloudinary Dashboard](https://res.cloudinary.com/demo/image/upload/v1/docs/cloudinary_dashboard.png)

## Paso 3: Configurar Variables de Entorno

1. En la raíz del proyecto, crea un archivo `.env.local`
2. Copia el contenido de `.env.example`
3. Reemplaza los valores con tus credenciales:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name-aqui
CLOUDINARY_API_KEY=tu-api-key-aqui
CLOUDINARY_API_SECRET=tu-api-secret-aqui
```

**Importante:**
- `NEXT_PUBLIC_` permite acceso desde el cliente
- `API_KEY` y `API_SECRET` son **privados** y solo se usan en el servidor
- **NUNCA** subas `.env.local` a Git (ya está en `.gitignore`)

## Paso 4: Verificar la Configuración

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a `/admin` e inicia sesión

3. Intenta subir una imagen en **Productos** o **Galería**

4. Si todo está bien configurado:
   - La imagen se subirá a Cloudinary
   - La URL será algo como: `https://res.cloudinary.com/tu-cloud-name/image/upload/...`
   - La imagen se mostrará optimizada automáticamente

## Paso 5: Organización en Cloudinary

Las imágenes se organizan automáticamente en carpetas:

```
dulcehogar/
  ├── productos/      # Imágenes de productos
  └── galeria/        # Imágenes de galería
```

Puedes ver y gestionar tus imágenes en:
[https://console.cloudinary.com/console/media_library](https://console.cloudinary.com/console/media_library)

## Características de Optimización

El sistema está configurado para:

1. **Límite de tamaño**: Máximo 1200x1200px
2. **Calidad automática**: Cloudinary optimiza según el dispositivo
3. **Formato automático**: Usa WebP en navegadores compatibles
4. **CDN**: Entrega rápida desde el servidor más cercano

## Límites del Plan Gratuito

| Recurso | Límite Mensual | Suficiente Para |
|---------|----------------|-----------------|
| Almacenamiento | 25 GB | Miles de imágenes |
| Ancho de banda | 25 GB | Miles de visitas |
| Transformaciones | 25,000 | Más que suficiente |
| Imágenes | Sin límite | ∞ |

Para un sitio de repostería pequeño/mediano, el plan gratuito es **más que suficiente**.

## Solución de Problemas

### Error: "Cloudinary no está configurado"
- Verifica que las 3 variables de entorno estén en `.env.local`
- Asegúrate de que no tengan espacios extras
- Reinicia el servidor después de agregar las variables

### Error: "Invalid API Key"
- Verifica que copiaste correctamente la API Key
- Revisa que no haya espacios al inicio/final
- Confirma que estás usando las credenciales de la cuenta correcta

### Las imágenes no se cargan
- Verifica tu conexión a internet
- Revisa la consola del navegador para errores
- Confirma que el tamaño del archivo sea menor a 5MB

### Error 403 (Forbidden)
- Tu API Secret puede estar incorrecta
- Verifica que tu cuenta de Cloudinary esté activa
- Revisa los permisos en Cloudinary Console

## Migración de Imágenes Existentes

Si ya tienes imágenes en `public/images/`:

1. Ve a la [Media Library](https://console.cloudinary.com/console/media_library) de Cloudinary
2. Haz clic en "Upload" → "Upload files"
3. Selecciona tus imágenes
4. En "Folder", escribe: `dulcehogar/productos` o `dulcehogar/galeria`
5. Sube las imágenes
6. Copia las URLs y actualiza tus productos/galería en el admin

## Siguiente Nivel: Transformaciones Avanzadas

Cloudinary permite transformaciones en la URL:

```
# Original
https://res.cloudinary.com/demo/image/upload/sample.jpg

# Con transformaciones
https://res.cloudinary.com/demo/image/upload/w_300,h_300,c_fill/sample.jpg
```

Puedes aplicar:
- **Recorte inteligente**: `c_fill`, `c_thumb`
- **Efectos**: `e_blur`, `e_sharpen`
- **Marca de agua**: Agregar logo automáticamente
- **Calidad**: `q_auto`, `q_80`

Documentación completa: [https://cloudinary.com/documentation/image_transformations](https://cloudinary.com/documentation/image_transformations)

## Seguridad

Para mayor seguridad en producción:

1. **Signed URLs**: Evita modificaciones no autorizadas
2. **Upload Presets**: Control sobre quién puede subir
3. **Rate Limiting**: Limita el número de uploads por hora

Ver: [Cloudinary Security Best Practices](https://cloudinary.com/documentation/security_considerations)

## Monitoreo y Analytics

En el Dashboard de Cloudinary puedes ver:
- Uso de almacenamiento
- Ancho de banda consumido
- Transformaciones realizadas
- Imágenes más populares

## Soporte

- **Documentación**: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Community**: [https://community.cloudinary.com/](https://community.cloudinary.com/)
- **Soporte**: support@cloudinary.com

---

**¡Listo!** Ahora tus imágenes están en la nube y optimizadas automáticamente.
