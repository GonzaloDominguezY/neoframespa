# NeoFrame Web

Sitio web corporativo de NeoFrame SpA.

## Empresa

NeoFrame SpA  
RUT: 78.426.227-8  
Villa Alemana, Región de Valparaíso, Chile

Correo:
contacto.neoframe@gmail.com

Teléfono:
+56 9 5083 1647

## Tecnologías

- HTML5
- CSS3
- JavaScript

## Arquitectura actual

Los proyectos se almacenan temporalmente en:

js/projects-data.js

Este archivo funciona como fuente de datos local.

## Arquitectura futura

La aplicación administrativa de NeoFrame
proporcionará los proyectos mediante una API.

Ejemplo:

GET /api/projects
GET /api/projects/:id

La landing consumirá esta API mediante fetch().

El administrador podrá gestionar desde la
aplicación:

- proyectos
- fotografías
- descripciones
- categorías
- ubicación
- valores
- proyectos destacados
- estado de publicación

## Formulario

Actualmente el formulario utiliza mailto.

Posteriormente deberá reemplazarse por:

POST /api/contact

para permitir envío automático desde el
servidor.