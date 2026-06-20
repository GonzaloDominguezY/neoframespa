<?php
/**
 * API Endpoint para procesar solicitudes de cotización
 * Este archivo maneja las solicitudes del formulario de contacto
 * 
 * CONFIGURACIÓN:
 * 1. Descomenta la sección de base de datos cuando tengas BD configurada
 * 2. Actualiza el email destino (contacto.neoframe@gmail.com)
 * 3. Implementa validaciones adicionales según necesites
 */

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo acepta POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Obtener datos JSON
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

// Validar datos requeridos
$nombre = $data['nombre'] ?? '';
$email = $data['email'] ?? '';
$empresa = $data['empresa'] ?? '';
$telefono = $data['telefono'] ?? '';
$tipoProyecto = $data['tipoProyecto'] ?? '';
$mensaje = $data['mensaje'] ?? '';
$timestamp = $data['timestamp'] ?? date('Y-m-d H:i:s');

// Validar campos requeridos
if (empty($nombre) || empty($email) || empty($tipoProyecto) || empty($mensaje)) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit();
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit();
}

try {
    // TODO: Descomentar cuando tengas base de datos configurada
    /*
    // Conexión a BD (ejemplo con MySQL)
    $pdo = new PDO(
        'mysql:host=localhost;dbname=neoframe_db',
        'usuario_bd',
        'contraseña_bd'
    );
    
    // Preparar y ejecutar insert
    $stmt = $pdo->prepare('
        INSERT INTO cotizaciones (
            nombre, email, empresa, telefono, tipo_proyecto, mensaje, fecha_creacion
        ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    ');
    
    $stmt->execute([$nombre, $email, $empresa, $telefono, $tipoProyecto, $mensaje]);
    $cotizacion_id = $pdo->lastInsertId();
    */
    
    // Preparar email
    $para = 'contacto.neoframe@gmail.com';
    $asunto = "Nueva Solicitud de Cotización - $nombre";
    
    $mensaje_email = "
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .header { background: #001f4d; color: #fff; padding: 20px; }
                .content { padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #003366; }
                .value { color: #555; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>Nueva Solicitud de Cotización</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Nombre:</div>
                    <div class='value'>$nombre</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>$email</div>
                </div>
                " . (!empty($empresa) ? "
                <div class='field'>
                    <div class='label'>Empresa:</div>
                    <div class='value'>$empresa</div>
                </div>
                " : "") . "
                " . (!empty($telefono) ? "
                <div class='field'>
                    <div class='label'>Teléfono:</div>
                    <div class='value'>$telefono</div>
                </div>
                " : "") . "
                <div class='field'>
                    <div class='label'>Tipo de Proyecto:</div>
                    <div class='value'>$tipoProyecto</div>
                </div>
                <div class='field'>
                    <div class='label'>Mensaje:</div>
                    <div class='value'>$mensaje</div>
                </div>
                <div class='field' style='color: #999; font-size: 12px;'>
                    <div>Fecha: " . date('d/m/Y H:i:s') . "</div>
                </div>
            </div>
        </body>
    </html>
    ";
    
    // Headers para email HTML
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    
    // Enviar email
    $email_enviado = mail($para, $asunto, $mensaje_email, $headers);
    
    // Enviar confirmación al cliente
    $asunto_confirmacion = "Hemos recibido tu solicitud - NeoFrame";
    $mensaje_confirmacion = "
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .header { background: #001f4d; color: #fff; padding: 20px; }
                .content { padding: 20px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>¡Gracias por tu solicitud!</h2>
            </div>
            <div class='content'>
                <p>Hola $nombre,</p>
                <p>Hemos recibido tu solicitud de cotización y nos contactaremos en menos de 24 horas hábiles.</p>
                <p>Nuestro equipo de especialistas revisará los detalles de tu proyecto y te enviaremos una propuesta personalizada.</p>
                <br>
                <p>Saludos cordiales,<br>Equipo NeoFrame</p>
            </div>
        </body>
    </html>
    ";
    
    $headers_confirmacion = "MIME-Version: 1.0\r\n";
    $headers_confirmacion .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers_confirmacion .= "From: contacto.neoframe@gmail.com\r\n";
    
    mail($email, $asunto_confirmacion, $mensaje_confirmacion, $headers_confirmacion);
    
    // Respuesta de éxito
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Solicitud enviada correctamente',
        // 'cotizacion_id' => $cotizacion_id // Descomentar cuando tengas BD
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al procesar la solicitud: ' . $e->getMessage()
    ]);
}
?>
