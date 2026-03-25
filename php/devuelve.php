<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . "/lib/devuelveJson.php";

try {
    $servicios = [
        [
            "id" => 1,
            "nombre" => "Consulta General",
            "precio" => 450,
            "descripcion" => "Revisión completa de signos vitales y estado general.",
            "tiempo" => "30 min"
        ],
        [
            "id" => 2,
            "nombre" => "Vacunación",
            "precio" => 850,
            "descripcion" => "Aplicación de refuerzos anuales con certificado oficial.",
            "tiempo" => "15 min"
        ],
        [
            "id" => 3,
            "nombre" => "Estética Canina",
            "precio" => 600,
            "descripcion" => "Baño, corte de pelo y limpieza de oídos profesional.",
            "tiempo" => "90 min"
        ]
    ];

  devuelveJson($servicios);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error interno en el servidor"]);
} 
/* <?php */
/* echo "No JSON";  */
/* ?> */ 

/* <?php */
/* http_response_code(500); */
/* exit;  */
/* ?> */
