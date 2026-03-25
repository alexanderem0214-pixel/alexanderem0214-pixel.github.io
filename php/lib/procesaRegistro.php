<?php
header('Content-Type: application/json; charset=utf-8');

$host = "dpg-d6p28jfkijhs73fgdk40-a.oregon-postgres.render.com";
$dbname = "full_service";
$user = "full_service_user";
$pass = "DzONlV7b1JqHffLAnWRX1tiab00izQCv";

$conn_string = "host=$host dbname=$dbname user=$user password=$pass sslmode=require";

try {
    $dbconn = pg_connect($conn_string);
    if (!$dbconn) throw new Exception("Error de conexión al servidor de base de datos.");

    $email = $_POST['email'] ?? '';
    $nombre = $_POST['nombre'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            "title" => "Formato Inválido",
            "detail" => "La dirección de correo electrónico no tiene un formato válido.",
            "status" => 400
        ]);
        exit;
    }

    $checkEmail = pg_query_params($dbconn, "SELECT id FROM usuarios WHERE email = $1", array($email));
    
    if (pg_num_rows($checkEmail) > 0) {
        http_response_code(409);
        echo json_encode([
            "title" => "Usuario Existente",
            "detail" => "Este correo ya se encuentra registrado en nuestra base de datos.",
            "status" => 409
        ]);
        exit;
    }

    echo json_encode(["message" => "Registro completado con éxito."]);

    pg_close($dbconn);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "title" => "Error del Sistema",
        "detail" => $e->getMessage(),
        "status" => 500
    ]);
}
