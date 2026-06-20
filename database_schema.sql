-- ========================================
-- ESTRUCTURA DE BASE DE DATOS PARA NEOFRAME
-- ========================================
-- Descomentar y ejecutar en tu hosting una vez configurado

-- Tabla para almacenar solicitudes de cotización
CREATE TABLE IF NOT EXISTS cotizaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    empresa VARCHAR(150),
    telefono VARCHAR(20),
    tipo_proyecto VARCHAR(100) NOT NULL,
    mensaje LONGTEXT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado ENUM('nueva', 'revisada', 'respondida', 'cerrada') DEFAULT 'nueva',
    notas_internas LONGTEXT,
    INDEX idx_email (email),
    INDEX idx_fecha (fecha_creacion),
    INDEX idx_estado (estado)
);

-- Tabla para almacenar respuestas/seguimiento
CREATE TABLE IF NOT EXISTS cotizacion_seguimiento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cotizacion_id INT NOT NULL,
    tipo VARCHAR(50),
    mensaje LONGTEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    creado_por VARCHAR(100),
    FOREIGN KEY (cotizacion_id) REFERENCES cotizaciones(id) ON DELETE CASCADE,
    INDEX idx_cotizacion (cotizacion_id)
);

-- Tabla para almacenar proyectos realizados
CREATE TABLE IF NOT EXISTS proyectos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descripcion LONGTEXT,
    categoria VARCHAR(100),
    imagen_principal VARCHAR(255),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo', 'destacado') DEFAULT 'activo',
    INDEX idx_categoria (categoria)
);

-- Tabla de contacto (opcional, para registrar calls a links de contacto)
CREATE TABLE IF NOT EXISTS registros_contacto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('email', 'whatsapp', 'llamada', 'formulario') NOT NULL,
    ip_origen VARCHAR(45),
    user_agent VARCHAR(255),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_fecha (fecha_creacion)
);
