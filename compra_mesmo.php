<?php
include 'conecta.php';
session_start();
$id = $_SESSION['compra'] ?? '';
$id_user = $conn->prepare("SELECT usuarios FROM userproduto WHERE produtos = :id");
$id_user->bindParam(':id', $id);
$id_user->execute();
$user = $id_user->fetch(PDO::FETCH_ASSOC);
$consulta = $conn->prepare("SELECT * FROM produtos WHERE Id = :id");