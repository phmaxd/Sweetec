<?php
include 'conecta.php';

Session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: pagina.html");
    exit();
}
$compra = $_POST['id'];
$_SESSION['compra'] = $compra;