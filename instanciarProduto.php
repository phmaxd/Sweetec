<?php

include "conecta.php";

$id = $_POST['id'] ?? null;

$exibir = "SELECT * from produtos WHERE Id = " . $id . ";";
    //comando sql para exibir colunas da tabela


$stmt = $conn->query($exibir);
$row = $stmt->fetch(PDO::FETCH_ASSOC);



echo $row['Nome'] . " - " . $row['Descricao'] . " - " . $row['Imagem'] . " - " . $row['Id'];