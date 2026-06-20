# INSTRUCCIONES: Comentar/Descomentar Formulario

## ESTADO ACTUAL
✅ El formulario **ESTÁ VISIBLE** en la página
✅ Está completamente funcional (sin backend)
✅ Está listo para usar con backend cuando lo necesites

## Si quieres OCULTARLO TEMPORALMENTE

### Opción 1: Comentar en HTML (Más fácil)

Abre `index.html` y busca la línea ~342:
```html
<!-- Contact Form Section -->
<div class="contact-form-wrapper">
```

Cambia a:
```html
<!-- Contact Form Section 
<div class="contact-form-wrapper">
```

Y la línea ~420 que cierra el formulario:
```html
        </div>
    </div>
</section>
```

Cambia a:
```html
        </div>
    </div>
</section>
-->
```

Resultado: El formulario no se verá pero estará en el código.

### Opción 2: Ocultar con CSS

Si prefieres ocultar sin editar HTML, ve a `style.css` y agrega:
```css
.contact-form-wrapper {
    display: none !important;
}
```

Esto oculta el formulario completamente.

---

## Para VOLVER A MOSTRARLO

Simplemente revierte los cambios:
- Elimina los comentarios `<!-- ... -->`
- O elimina la regla CSS `display: none`

---

## RECOMENDACIÓN

⭐ **Mantén el formulario visible** en la página. Razones:

1. Está completamente funcional (muestra alert sin backend)
2. Los visitantes verán que tienes forma de contactarlos
3. Es fácil activar backend cuando lo necesites (solo 2-3 cambios)
4. Mejora la apariencia profesional del sitio
5. No hay riesgo de que se vea roto o incompleto

---

## CUANDO TENGAS HOSTINGER Y BD

1. Sigue la guía: `GUIA_HOSTINGER.md`
2. Actualiza `api_cotizacion.php` con tus credenciales
3. El formulario empezará a guardar datos automáticamente
4. ¡No necesitas cambios en HTML!

---

¡El formulario está listo! 🚀
