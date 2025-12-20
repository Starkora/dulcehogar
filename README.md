# Dulce Hogar - Repostería Artesanal

Una moderna página web para repostería construida con Next.js 16, TypeScript y Tailwind CSS.

## 🍰 Características

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

## 🚀 Tecnologías

- **Framework**: Next.js 16.1.0 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Iconos**: Lucide React
- **Fuentes**: Inter (sans-serif) y Playfair Display (serif)
- **Build Tool**: Turbopack
- **Almacenamiento**: localStorage para reseñas de usuarios

## 📦 Instalación

```bash
# Instalar dependencias
npm install

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

## 🌐 Páginas

- **/** - Página de inicio con hero, servicios y productos destacados
- **/productos** - Catálogo completo de productos con filtros
- **/nosotros** - Historia, filosofía y equipo
- **/contacto** - Formulario de contacto e información
- **/admin/reviews** - Panel de administración para moderar reseñas (contraseña: `dulcehogar2024`)

## 🎯 Personalización

### WhatsApp
Actualiza el número de WhatsApp en:
- `components/WhatsAppButton.tsx` - Botón flotante
- `components/ProductCard.tsx` - Botones de productos
Formato: `57300123456` (código país + número sin espacios)

### Colores
Los colores principales se pueden modificar en los componentes:
- Rosa: `pink-500`, `pink-600`
- Naranja: `orange-50`, `orange-500`

### Productos
Edita los productos en `app/productos/page.tsx` y `app/page.tsx` (productos destacados).

### Información de Contacto
Actualiza la información en:
- `components/Footer.tsx`
- `app/contacto/page.tsx`

### Reseñas
Las reseñas se almacenan en localStorage del navegador con la clave `dulcehogar-all-reviews`.

**Sistema de Moderación:**
- Las reseñas pasan por validación automática
- Detecta: spam, URLs, palabras prohibidas, contenido repetitivo
- Rate limiting: máximo 2 reseñas por hora por usuario
- Reseñas sospechosas quedan pendientes de aprobación manual
- Panel de admin en `/admin/reviews` (contraseña: `dulcehogar2024`)

**Validaciones automáticas:**
- Mínimo 10 caracteres en el comentario
- Máximo 500 caracteres
- No permite URLs ni información de contacto
- Detecta patrones de spam
- Calificaciones 1-2 estrellas requieren revisión manual

Para limpiar todas las reseñas: `localStorage.removeItem('dulcehogar-all-reviews')`
Edita los productos en `app/productos/page.tsx` y `app/page.tsx` (productos destacados).

### Información de Contacto
Actualiza la información en:
- `components/Footer.tsx`
- `app/contacto/page.tsx`

## 📱 Características de Diseño

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

Hecho con ❤️ para endulzar el mundo

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
