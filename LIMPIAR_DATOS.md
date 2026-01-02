# Limpiar Datos del Navegador

Si necesitas empezar desde cero y eliminar todos los datos almacenados en el navegador, sigue estos pasos:

## Opción 1: Desde la Consola del Navegador

1. Abre el sitio en tu navegador (http://localhost:3000)
2. Presiona **F12** para abrir las Herramientas de Desarrollador
3. Ve a la pestaña **Console** (Consola)
4. Ejecuta el siguiente comando:

```javascript
localStorage.clear()
location.reload()
```

Esto eliminará:
- ✅ Todos los productos
- ✅ Todas las imágenes de la galería
- ✅ Todas las promociones
- ✅ Toda la configuración del sitio
- ✅ La sesión de autenticación

## Opción 2: Desde las Herramientas de Desarrollador

1. Presiona **F12**
2. Ve a **Application** (o **Almacenamiento**)
3. En el menú lateral, expande **Local Storage**
4. Haz clic en `http://localhost:3000`
5. Verás una clave llamada `dulcehogar-siteconfig`
6. Haz clic derecho y selecciona **Delete** (Eliminar)
7. También elimina `dulcehogar-auth` si existe
8. Recarga la página

## Opción 3: Borrar Datos Específicos

Si solo quieres borrar productos, galería o promociones:

```javascript
// Solo productos
const config = JSON.parse(localStorage.getItem('dulcehogar-siteconfig') || '{}');
config.products = [];
localStorage.setItem('dulcehogar-siteconfig', JSON.stringify(config));
location.reload();

// Solo galería
const config = JSON.parse(localStorage.getItem('dulcehogar-siteconfig') || '{}');
config.gallery = [];
localStorage.setItem('dulcehogar-siteconfig', JSON.stringify(config));
location.reload();

// Solo promociones
const config = JSON.parse(localStorage.getItem('dulcehogar-siteconfig') || '{}');
config.promotions = [];
localStorage.setItem('dulcehogar-siteconfig', JSON.stringify(config));
location.reload();
```

## Opción 4: Cerrar Sesión de Admin

Para cerrar la sesión del admin sin borrar el contenido:

```javascript
localStorage.removeItem('dulcehogar-auth')
location.reload()
```

## Nota Importante

⚠️ **Al limpiar localStorage, perderás TODOS los datos**. Esto incluye productos, galería, promociones y configuraciones que hayas agregado desde el panel de administración.

Para evitar pérdida de datos en el futuro, considera:
1. Exportar los datos antes de limpiar
2. Usar una base de datos real (Supabase, MongoDB, PostgreSQL)
3. Hacer respaldos periódicos

## Empezar desde Cero

Después de limpiar el localStorage:
1. Ve a `/admin`
2. Inicia sesión con: `DulceHogar@2026VMT`
3. Agrega tus productos en `/admin/productos`
4. Agrega tus imágenes en `/admin/galeria`
5. Configura promociones en `/admin/promociones`
6. Ajusta la visibilidad en `/admin/configuracion`
