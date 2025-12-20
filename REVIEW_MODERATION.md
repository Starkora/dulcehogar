# Sistema de Moderación de Reseñas - Dulce Hogar

## 🛡️ Protección contra Spam y Contenido Malicioso

Este sistema implementa múltiples capas de protección para mantener la calidad y autenticidad de las reseñas.

## Validaciones Automáticas

### 1. **Validación de Formato**
- ✅ Nombre: mínimo 2 caracteres, máximo 50
- ✅ Comentario: mínimo 10 caracteres, máximo 500
- ✅ Calificación: debe estar entre 1 y 5 estrellas
- ✅ Evento: debe seleccionarse de la lista predefinida

### 2. **Detección de Spam**
El sistema detecta automáticamente:
- 🚫 URLs o enlaces (http://, www., etc.)
- 🚫 Información de contacto (teléfonos, emails)
- 🚫 Palabras prohibidas o inapropiadas
- 🚫 Contenido repetitivo (menos de 30% palabras únicas)
- 🚫 Comentarios muy genéricos o cortos

### 3. **Rate Limiting**
- ⏱️ Máximo 2 reseñas por hora por usuario
- 🔍 Usa fingerprinting del navegador (no IP real)
- 🛑 Bloquea intentos de spam masivo

### 4. **Moderación Inteligente**
**Aprobación Automática:**
- Comentarios de 3-5 estrellas
- Sin palabras prohibidas
- Sin URLs ni contactos
- Contenido original y detallado

**Revisión Manual Requerida:**
- Calificaciones de 1-2 estrellas
- Comentarios con palabras sospechosas
- Contenido muy genérico
- URLs o información de contacto detectada

## Panel de Administración

### Acceso
- URL: `http://localhost:3000/admin/reviews`
- Contraseña por defecto: `dulcehogar2024`

### Funcionalidades

#### Vista de Pendientes
- 📋 Lista todas las reseñas que requieren aprobación
- ✅ Botón "Aprobar" - Publica la reseña inmediatamente
- ❌ Botón "Rechazar" - Rechaza la reseña (no se publica)

#### Vista de Aprobadas
- 📋 Lista todas las reseñas publicadas
- 🗑️ Botón "Eliminar" - Elimina permanentemente una reseña

### Información de Cada Reseña
- Nombre del usuario
- Tipo de evento
- Fecha de publicación
- Calificación en estrellas
- Comentario completo
- ID único
- Timestamp completo

## Flujo de Reseñas

```
Usuario envía reseña
        ↓
Validación de formato ──→ ❌ Error → Mensaje al usuario
        ↓ ✅
Rate Limiting check ──→ ❌ Límite excedido → Mensaje de espera
        ↓ ✅
Validación de contenido
        ↓
    ┌───┴───┐
    ↓       ↓
Sin problemas    Sospechoso
    ↓              ↓
APROBADA     PENDIENTE
(publicada)   (espera admin)
    ↓              ↓
Visible      Admin decide:
en web       Aprobar/Rechazar
```

## Almacenamiento

Las reseñas se guardan en `localStorage` con la estructura:

```typescript
{
  id: string;              // Identificador único
  name: string;            // Nombre del usuario
  rating: number;          // 1-5 estrellas
  comment: string;         // Comentario
  event: string;           // Tipo de evento
  date: string;            // Fecha formateada
  status: 'pending' | 'approved' | 'rejected';
  ipHash: string;          // Fingerprint del navegador
  timestamp: number;       // Timestamp Unix
}
```

**Clave de almacenamiento:** `dulcehogar-all-reviews`

## Seguridad Adicional

### Recomendaciones para Producción

1. **Autenticación Real**
   - Implementar OAuth o JWT para el panel admin
   - Eliminar contraseña hardcodeada
   - Usar variables de entorno

2. **Backend API**
   - Mover lógica de validación al servidor
   - Usar base de datos real (PostgreSQL, MongoDB)
   - Implementar rate limiting por IP real

3. **Captcha**
   - Integrar Google reCAPTCHA v3
   - Prevenir bots automatizados

4. **Notificaciones**
   - Email al admin cuando hay reseñas pendientes
   - Dashboard con métricas

5. **Análisis de Sentimientos**
   - API de IA para detectar toxicidad
   - Clasificación automática avanzada

## Personalización

### Modificar Palabras Prohibidas
Edita `lib/reviewModeration.ts`:

```typescript
const bannedWords = [
  'spam', 'basura', 'estafa',
  // Agrega tus propias palabras
];
```

### Cambiar Rate Limit
Edita la función `checkRateLimit()` en `lib/reviewModeration.ts`:

```typescript
const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hora
return recentReviewsFromIP.length < 2; // máximo 2
```

### Cambiar Contraseña Admin
Edita `app/admin/reviews/page.tsx`:

```typescript
const ADMIN_PASSWORD = 'tu_nueva_contraseña';
```

**⚠️ IMPORTANTE:** Esto es solo para desarrollo. En producción usa autenticación real.

## Métricas y Estadísticas

El sistema permite rastrear:
- Total de reseñas recibidas
- Reseñas aprobadas vs rechazadas
- Tasa de spam detectado
- Promedio de calificaciones
- Tipos de eventos más populares

## Mantenimiento

### Limpiar Todas las Reseñas
```javascript
localStorage.removeItem('dulcehogar-all-reviews');
```

### Ver Todas las Reseñas (Consola)
```javascript
const reviews = JSON.parse(localStorage.getItem('dulcehogar-all-reviews'));
console.log(reviews);
```

### Exportar Reseñas
```javascript
const reviews = JSON.parse(localStorage.getItem('dulcehogar-all-reviews'));
const json = JSON.stringify(reviews, null, 2);
// Copiar json a un archivo
```

## Soporte y Ayuda

Si necesitas ayuda o tienes preguntas:
1. Revisa la documentación en `README.md`
2. Verifica la consola del navegador para errores
3. Prueba el sistema en modo incógnito para simular nuevo usuario
