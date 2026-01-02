# Dulce Hogar - Repostería Artesanal

Una moderna página web para repostería construida con Next.js 16, TypeScript y Tailwind CSS.

## Características

- **Landing Page Atractiva**: Hero section con llamados a la acción claros
- **Catálogo de Productos**: Muestra tortas, cupcakes, galletas y más postres
- **Sistema de Reseñas con Moderación**: 
  - Validación automática contra spam y contenido inapropiado
  - Rate limiting (máximo 2 reseñas por hora)
  - Detección de URLs, palabras prohibidas y contenido repetitivo
  - Panel de administración para aprobar/rechazar reseñas
  - Solo se muestran reseñas aprobadas públicamente
- **Integración WhatsApp**: 
  - Botón flotante para contacto general
  - Botones "Pedir" en productos que abren WhatsApp con información del producto
- **Página Sobre Nosotros**: Historia de la empresa y equipo
- **Formulario de Contacto**: Para pedidos y consultas
- **Diseño Responsivo**: Optimizado para móviles, tablets y escritorio
- **Navegación Intuitiva**: Header con menú hamburguesa para móviles
- **Footer Completo**: Con enlaces rápidos y información de contacto
- **SEO Optimizado**: Meta tags, Open Graph y Schema.org markup
- **Iconos Profesionales**: Lucide React en lugar de emojis

## Tecnologías

- **Framework**: Next.js 16.1.0 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Iconos**: Lucide React
- **Fuentes**: Inter (sans-serif) y Playfair Display (serif)
- **Build Tool**: Turbopack
- **Almacenamiento**: localStorage para reseñas de usuarios

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar Cloudinary (requerido para subir imágenes)
# 1. Copia .env.example a .env.local
# 2. Completa con tus credenciales de Cloudinary
# Ver CLOUDINARY_SETUP.md para instrucciones detalladas

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```
dulcehogar/
├── app/
│   ├── page.tsx           # Página principal (con reseñas dinámicas)
│   ├── layout.tsx         # Layout principal con SEO
│   ├── globals.css        # Estilos globales (Tailwind v4)
│   ├── productos/         # Catálogo de productos
│   ├── nosotros/          # Sobre la empresa
│   └── contacto/          # Formulario de contacto
├── components/
│   ├── Header.tsx         # Navegación
│   ├── Footer.tsx         # Pie de página
│   ├── ProductCard.tsx    # Tarjeta de producto (con botón WhatsApp)
│   ├── TestimonialCard.tsx # Tarjeta de reseña
│   ├── ReviewForm.tsx     # Formulario para nuevas reseñas
│   └── WhatsAppButton.tsx # Botón flotante de WhatsApp
├── lib/
│   ├── seo.ts             # Utilidades SEO
│   └── schema.ts          # Schema.org markup
└── public/
    └── images/            # Imágenes de productos
``` public/
    └── images/            # Imágenes de productos
```

## Páginas

- **/** - Página de inicio con hero, servicios y productos destacados
- **/productos** - Catálogo completo de productos con filtros
- **/nosotros** - Historia, filosofía y equipo
- **/contacto** - Formulario de contacto e información
- **/admin** - Panel de administración completo (contraseña: `DulceHogar@2026VMT`)
  - **/admin/productos** - Gestionar productos del catálogo
  - **/admin/galeria** - Administrar imágenes de la galería
  - **/admin/promociones** - Crear y editar promociones
  - **/admin/configuracion** - Configurar visibilidad de secciones y popup de salida

## Panel de Administración

El sitio cuenta con un panel de administración completo para gestionar todo el contenido dinámicamente:

### Acceso
- **URL**: `/admin`
- **Contraseña**: `DulceHogar@2026VMT`
- **Sesión**: Dura 24 horas
- **Seguridad**: Solo usuarios autenticados pueden acceder

### Funcionalidades

#### 1. Gestión de Productos (`/admin/productos`)
- Agregar nuevos productos con imagen, nombre, descripción, precio
- Editar productos existentes
- Eliminar productos
- **Carga de imágenes**: Sube archivos directamente o ingresa URLs

#### 2. Gestión de Galería (`/admin/galeria`)
- Agregar imágenes a la galería con título y categoría
- Editar información de imágenes
- Eliminar imágenes
- **Carga de imágenes**: Sube archivos directamente o ingresa URLs

#### 3. Gestión de Promociones (`/admin/promociones`)
- Crear promociones con descuento y condiciones
- Agregar anuncios de temporada
- Editar y eliminar promociones
- Las promociones aparecen en la página principal

#### 4. Configuración del Sitio (`/admin/configuracion`)
- Mostrar/ocultar sección de Productos Destacados
- Mostrar/ocultar sección de Promociones
- Mostrar/ocultar sección de Galería
- Configurar Popup de Salida:
  - Habilitar/deshabilitar popup
  - Editar porcentaje de descuento
  - Editar código de descuento
  - Establecer monto mínimo de compra

### Sistema de Carga de Imágenes ☁️

El panel incluye un sistema flexible para gestionar imágenes con almacenamiento en **Cloudinary**:

**Dos Opciones de Carga:**
1. **Subir Archivo** (Recomendado): Las imágenes se suben a Cloudinary automáticamente
2. **Ingresar URL**: Usa URLs de Cloudinary existentes o imágenes externas

**Características:**
- ✅ **Almacenamiento en la nube**: Cloudinary CDN global
- ✅ **Optimización automática**: Compresión inteligente y conversión a WebP
- ✅ **Listo para producción**: Funciona en Vercel, Netlify, etc.
- ✅ Formatos soportados: JPEG, PNG, GIF, WEBP
- ✅ Tamaño máximo: 5MB por imagen
- ✅ Vista previa antes de guardar
- ✅ Plan gratuito generoso: 25GB almacenamiento + 25GB bandwidth/mes

**Configuración Requerida:**
1. Crear cuenta gratuita en [Cloudinary](https://cloudinary.com/users/register/free)
2. Copiar `.env.example` a `.env.local`
3. Agregar credenciales de Cloudinary
4. Ver [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) para instrucciones completas

**Documentación**: Ver [ADMIN_IMAGE_UPLOAD.md](./ADMIN_IMAGE_UPLOAD.md)

### Almacenamiento de Datos

- **Contenido del sitio**: localStorage (ideal para desarrollo y demostración)
- **Imágenes**: Cloudinary (listo para producción)
- **Para producción**: Migrar datos de localStorage a base de datos (Supabase, PostgreSQL, MongoDB)
- **Clave localStorage**: `dulcehogar-siteconfig`

## Páginas

### WhatsApp
Actualiza el número de WhatsApp en:
- `components/WhatsAppButton.tsx` - Botón flotante
- `components/ProductCard.tsx` - Botones de productos
Formato: `57300123456` (código país + número sin espacios)

### Colores
Los colores principales se pueden modificar en los componentes:
- Rosa: `pink-500`, `pink-600`
- Naranja: `orange-50`, `orange-500`

### Información de Contacto
Actualiza la información en:
- `components/Footer.tsx`
- `app/contacto/page.tsx`

## Características de Diseño

- Gradientes suaves (rosa a naranja)
- Tarjetas con sombras y hover effects
- Botones redondeados con transiciones
- Íconos emoji para mayor atractivo visual
- Sistema de tipografía dual (Inter + Playfair Display)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

Hecho con amor para endulzar el mundo

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
