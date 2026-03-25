<?php
header('Content-Type: application/json; charset=utf-8');

$u = $_POST['usuario'] ?? '';

if ($u === '') {
    http_response_code(400);
    echo json_encode([
        "title" => "Campo vacío",
        "detail" => "Por favor escribe un nombre de usuario.",
        "status" => 400
    ]);
    exit;
}

echo json_encode([
    "nombre" => $u,
    "mensaje" => "Acceso correcto"
]);
