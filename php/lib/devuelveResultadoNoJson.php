<?php
require_once __DIR__ . "/INTERNAL_SERVER_ERROR.php";

function devuelveResultadoNoJson()
{
    $status = defined('INTERNAL_SERVER_ERROR') ? INTERNAL_SERVER_ERROR : 500;
    
    http_response_code($status);
    header("Content-Type: application/problem+json; charset=utf-8");

    $error = [
        "status" => $status,
        "title"  => "El resultado no puede representarse como JSON.",
        "type"   => "/errors/resultadonojson.html"
    ];

    echo json_encode($error);
}
