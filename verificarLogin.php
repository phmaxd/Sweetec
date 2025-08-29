<?php 
    
session_start();
    if(isset($_SESSION['IsLogadoCG'])){ // verifica se existe a sessão
        $usuario =  $_SESSION['usuario'];
        $escola = $_SESSION['escola'];
        $IsLogado = $_SESSION['IsLogadoCG'];

        header('Content-Type: application/json'); // <-- importante!
        echo json_encode([
            "islogado" => true,
            "usuario" => $usuario,
            "escola" => $escola
        ]);
       


    } else {
        echo json_encode([
            "islogado" => false,
        ]);
    };
    exit;
?>