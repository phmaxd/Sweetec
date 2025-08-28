<?php
include 'conecta.php';
session_start();

$id = $_SESSION['compra'] ?? '';

$sql = "
    SELECT p.*, u.*
    FROM userproduto up
    INNER JOIN produtos p ON up.produtos = p.Id
    INNER JOIN usuarios u ON up.usuarios = u.Id
    WHERE p.Id = :id
";

$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();

$resultado = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$resultado) {
    echo "Nenhum produto encontrado.";
    exit();
}
echo $resultado['Nome'] . " - " . $resultado['Descricao'] . " - " . $resultado['Imagem'] . " - " . $resultado['Id'] . " - " . $resultado['Numero'];

