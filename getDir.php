<?php

header("Content-type: text/json");
$directories = glob("../*");

$retorno = array();

foreach ($directories as $directory) {

    $newDirRetorno = array();
    $newDirRetorno['name'] = str_replace("../", "", $directory);

    if (is_dir($directory . "/www/"))
        $newDirRetorno['link'] = $directory . "/www/";
    else
        $newDirRetorno['link'] = $directory;

    array_push($retorno, $newDirRetorno);
}

echo json_encode($retorno, JSON_PRETTY_PRINT);