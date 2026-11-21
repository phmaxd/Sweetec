<?php
include "conecta.php";

$id = $_POST["id"];
$sql = $_POST["sql"];

$valor = $_POST["valor"];

$editar = $conn->prepare("UPDATE produtos SET $sql = :valor WHERE Id = :id");
$editar->execute([
    ":valor" => $valor,
    ":id" => $id
]);



include "instanciarProdutoUser.php";
?>