# GUÍA PASO A PASO: ACTIVAR FORMULARIO EN HOSTINGER

## PASO 1: Contratar Hostinger y configurar el dominio

1. Ve a https://www.hostinger.cl
2. Contrata un plan con:
   - ✅ Soporte PHP 7.4+
   - ✅ MySQL 5.7+
   - ✅ Dominio incluido o apunta www.neoframe.cl
3. Anota tus credenciales:
   - Usuario FTP/SFTP
   - Contraseña
   - Host del servidor
   - Host de base de datos
   - Usuario de BD
   - Contraseña de BD

## PASO 2: Subir archivos al servidor

### Opción A: Usando FTP (FileZilla)
1. Descarga FileZilla: https://filezilla-project.org/
2. Conéctate con los datos de Hostinger
3. Sube todos los archivos al directorio `public_html`:
   - index.html
   - style.css
   - script.js
   - logo.png
   - api_cotizacion.php
   - database_schema.sql

### Opción B: Usando CPanel (Panel de Hostinger)
1. Accede al panel: Hostinger.cl > Mi cuenta > Administrar sitios
2. Haz clic en "Administrador de archivos"
3. Carga los archivos en la raíz del sitio

## PASO 3: Crear la base de datos

1. En CPanel, busca "MySQL Bases de Datos"
2. Crea una nueva BD:
   - Nombre: `neoframe_db` (o similar)
   - Anotate el nombre exacto
3. Crea un usuario:
   - Usuario: `neoframe_user`
   - Contraseña: [CREA UNA SEGURA]
   - Dale acceso a la BD creada
4. En phpMyAdmin:
   - Selecciona la BD `neoframe_db`
   - Ve a "Importar"
   - Carga el archivo `database_schema.sql`
   - Haz clic en "Continuar"

## PASO 4: Actualizar credenciales en el servidor

1. En el gestor de archivos, edita **api_cotizacion.php**
2. Busca la línea ~72 donde dice `// TODO: Descomentar cuando tengas base de datos`
3. Cambia esto:
   ```php
   /*
   // Conexión a BD (ejemplo con MySQL)
   $pdo = new PDO(
       'mysql:host=localhost;dbname=neoframe_db',
       'usuario_bd',
       'contraseña_bd'
   );
   ```
4. Por esto (con tus credenciales reales):
   ```php
   // Conexión a BD
   $pdo = new PDO(
       'mysql:host=localhost;dbname=neoframe_db',
       'neoframe_user',
       'TU_CONTRASEÑA_SEGURA'
   );
   ```
5. Guarda el archivo

## PASO 5: Descomentar el formulario en index.html

1. En el gestor de archivos, edita **index.html**
2. Busca la línea ~342 donde aparece:
   ```html
   <!-- Contact Form Section -->
   <div class="contact-form-wrapper">
   ```
3. Verifica que **NO** esté dentro de comentarios `<!-- ... -->`
4. Si está comentado, elimina los `<!--` y `-->` que lo rodean
5. Guarda el archivo

## PASO 6: Configurar envío de emails (IMPORTANTE)

### En CPanel:
1. Ve a "Funciones de correo" o "Email Accounts"
2. Crea una cuenta de email: **contacto.neoframe@gmail.com**
   - Puede ser: contacto@neoframe.cl (mejor opción)
3. Anotate la contraseña

### En api_cotizacion.php:
1. Actualiza la línea que dice `$para = 'contacto.neoframe@gmail.com'`
2. Usa el email real del servidor: `$para = 'contacto@neoframe.cl'`
3. Guarda

## PASO 7: Probar el formulario

1. Abre tu sitio: https://www.neoframe.cl
2. Desplázate hasta la sección de contacto
3. Rellena el formulario:
   - Nombre: Test
   - Email: tu_email@gmail.com
   - Tipo: Estructuras Metálicas
   - Mensaje: Solicitud de prueba
4. Haz clic en "ENVIAR SOLICITUD"
5. Deberías recibir dos emails:
   - ✅ Confirmación en tu email
   - ✅ Notificación en contacto@neoframe.cl

## PASO 8: Ver datos en la BD (Opcional)

1. En CPanel, accede a **phpMyAdmin**
2. Selecciona `neoframe_db` > tabla `cotizaciones`
3. Deberías ver las filas de prueba enviadas

---

## SOLUCIÓN DE PROBLEMAS

### El formulario no envía
- ✅ Verifica que api_cotizacion.php esté en la raíz del sitio
- ✅ Que las credenciales de BD sean correctas
- ✅ Abre consola (F12 > Console) y busca errores

### No recibo emails
- ✅ Verifica el email en `$para` de api_cotizacion.php
- ✅ Revisa carpeta de SPAM
- ✅ Verifica que el email esté configurado en CPanel

### Error 500 al enviar formulario
- ✅ Revisa logs en CPanel > Error Logs
- ✅ Asegúrate que `database_schema.sql` fue importado correctamente
- ✅ Verifica permiso de BD en el usuario MySQL

### BD no conecta
- ✅ Host correcto (generalmente `localhost`)
- ✅ Usuario y contraseña coinciden exactamente
- ✅ Base de datos existe en phpMyAdmin

---

## SEGURIDAD

⚠️ IMPORTANTE: Antes de hacer público el sitio:

1. **Actualiza contraseñas**: Cambia todas las contraseñas por valores seguros
2. **HTTPS**: Activa SSL en CPanel (generalmente gratis)
3. **Validación**: Agrega más validaciones en api_cotizacion.php
4. **Rate limiting**: Limita requests por IP (previene spam)
5. **Captcha**: Considera agregar reCAPTCHA en el formulario

---

## CHECKLIST FINAL

- [ ] Hostinger contratado y dominio apuntando
- [ ] Archivos subidos a public_html
- [ ] BD creada en MySQL
- [ ] database_schema.sql importado
- [ ] api_cotizacion.php actualizado con credenciales
- [ ] index.html descomentado (formulario visible)
- [ ] Email configurado en CPanel
- [ ] Prueba de formulario enviada exitosamente
- [ ] Email de confirmación recibido
- [ ] Datos visibles en phpMyAdmin
- [ ] HTTPS activado
- [ ] Sitio listo para producción ✅

---

¿Necesitas ayuda con algún paso? Contáctame.
