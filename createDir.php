<?php

function isValidJSON($str)
{
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
}

$json_params = file_get_contents("php://input");

if (strlen($json_params) > 0 && isValidJSON($json_params))
    $decoded_params = json_decode($json_params);

$pathPasta = "../" . $decoded_params->nome_pasta;


if (!is_dir($pathPasta)) {
    mkdir($pathPasta);
    chmod($pathPasta, 0777);
    echo "Pasta '{$decoded_params->nome_pasta}' criada!\r\n";
} else
    echo "Pasta já existe: {$pathPasta}!\r\n";

foreach ($decoded_params->sub_pastas as $sub_pasta) {
    $path_subPasta = $pathPasta . "/" . $sub_pasta;

    if (!is_dir($path_subPasta)) {
        mkdir($path_subPasta);
        chmod($path_subPasta, 0777);
        echo "Sub pasta '{$sub_pasta}' criada!\r\n";
    } else
        echo "Sub pasta já existe: {$path_subPasta}!\r\n";
}