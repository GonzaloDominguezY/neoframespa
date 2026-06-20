# NEOFRAME - Landing Page

## Descripción
Landing page profesional para NeoFrame SPA, empresa especializada en estructuras metálicas, construcción modular y soluciones en acero.

## Archivos Principales

### HTML
- **index.html** - Estructura completa de la landing page
  - Navbar responsive
  - Hero section
  - Estadísticas
  - Sección Sobre Nosotros
  - Servicios con hover effects
  - Portafolio de proyectos
  - Opciones de contacto (Email, WhatsApp, Llamada)
  - Formulario de cotización (actualmente comentado)
  - Footer

### CSS
- **style.css** - Estilos responsive para todas las secciones
  - Diseño móvil-first
  - Animaciones suaves
  - Colores corporativos (azul marino y celeste)
  - Media queries para 1024px, 768px, 480px

### JavaScript
- **script.js** - Interactividad
  - Menú móvil
  - Smooth scrolling
  - Animaciones de entrada (Intersection Observer)
  - Manejador del formulario de cotización

### Backend (Cuando tengas Hosting)
- **api_cotizacion.php** - Endpoint para procesar cotizaciones
  - Validación de datos
  - Envío de emails (confirmación y notificación)
  - Preparado para integración con BD

- **database_schema.sql** - Esquema de base de datos
  - Tabla cotizaciones
  - Tabla seguimiento
  - Tabla proyectos
  - Tabla registros de contacto

## Cómo Usar

### Estado Actual (Sin Backend)
El formulario está incluido en `index.html` pero comentado. Las opciones de contacto (Email, WhatsApp, Llamada) funcionan de inmediato.

### Activar el Formulario (Cuando Tengas Hosting)

1. **Descomenta el formulario en index.html**
   ```html
   <!-- Busca la sección: Contact Form Section -->
   <!-- Descomenta todo el bloque <div class="contact-form-wrapper">...</div> -->
   ```

2. **Configura la Base de Datos**
   - Conéctate a tu hosting (Hostinger)
   - Ejecuta el SQL de `database_schema.sql`
   - Crea un usuario de BD con permisos SELECT, INSERT

3. **Actualiza api_cotizacion.php**
   ```php
   // Línea ~72: Descomenta y actualiza las credenciales
   $pdo = new PDO(
       'mysql:host=tu_host;dbname=tu_bd',
       'tu_usuario',
       'tu_contraseña'
   );
   ```

4. **Actualiza script.js**
   ```javascript
   // Línea ~100: Descomenta y actualiza la URL del API
   fetch('/api/cotizacion', {  // Cambiar si API está en ruta diferente
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
   })
   ```

## Colores Corporativos

- **Azul Marino (Primario)**: #001f4d / #003366
- **Azul Celeste (Secundario)**: #0066cc / #0099ff
- **Gris Claro (Fondo)**: #f8f9fa
- **Texto Oscuro**: #333333
- **Texto Gris**: #666666
- **Blanco**: #ffffff

## Información de Contacto

- **Teléfono**: +56 9 5083 1647
- **Email**: contacto.neoframe@gmail.com
- **Dirección**: Santiago, Chile
- **RUT**: 77.008.958-6
- **Servicios**: Estructuras Metálicas, Construcción Modular, Soldadura, Soluciones en Acero

## Características Destacadas

✅ Diseño responsive (Mobile-first)
✅ Hover effects en servicios (overlay azul)
✅ Grid masónico en portafolio
✅ Animaciones de entrada suaves
✅ Navbar sticky
✅ Formulario profesional (listo para backend)
✅ Validación de datos en frontend
✅ Emails HTML formateados
✅ Enlaces directos (Email, WhatsApp, Llamada)

## Notas de Desarrollo

- El formulario actualmente muestra un `alert()` de confirmación
- Los datos se registran en `console.log()` para debugging
- El backend está preparado para MySQL pero es portable a otros sistemas
- CORS está habilitado en api_cotizacion.php (ajusta según necesites)
- Los emails se envían con encabezados HTML

## Próximos Pasos

1. Contratar hosting en Hostinger con soporte PHP y MySQL
2. Apuntar dominio www.neoframe.cl al hosting
3. Crear base de datos en el hosting
4. Subir archivos al hosting
5. Descomentar formulario en index.html
6. Actualizar credenciales en api_cotizacion.php
7. Ejecutar database_schema.sql
8. Probar formulario

## Soporte

Para cambios en el diseño o funcionalidad, modifica:
- Estilos: `style.css`
- Contenido: `index.html`
- Lógica: `script.js`
