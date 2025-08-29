<?php 
    
session_start();

        $_SESSION['IsLogadoCG']=false;

session_destroy();

echo "Usuário deslogado com sucesso.";
?>