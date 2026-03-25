<?php
header('Content-Type: application/json; charset=utf-8');

$host = "dpg-d6p28jfkijhs73fgdk40-a.oregon-postgres.render.com";
$port = "5432";
$dbname = "full_service";
$user = "full_service_user";
$password = "DzONlV7b1JqHffLAnWRX1tiab00izQCv";

$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password sslmode=require";

try {
    $dbconn = pg_connect($conn_string);

    if (!$dbconn) {
        throw new Exception("No se pudo conectar a PostgreSQL en Render.");
    }

    $query = "SELECT nombre, especialidad, descripcion FROM equipo_medico";
    $result = pg_query($dbconn, $query);

    if (!$result) {
        throw new Exception("Error al ejecutar la consulta en la tabla equipo_medico.");
    }

    $equipo = pg_fetch_all($result);

    if (!$equipo) {
        echo json_encode([]);
    } else {
        echo json_encode($equipo);
    }

    pg_close($dbconn);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "title" => "Error de Base de Datos",
        "detail" => $e->getMessage(),
        "status" => 500
    ]);
}
