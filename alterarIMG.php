<?php
include "conecta.php";


$id = $_POST["id"];
$imgatual = $_POST["imgatual"];
$temimg = $_POST["temimg?"];
if (isset($_FILES['arquivo']) && $_FILES['arquivo']['error'] === UPLOAD_ERR_OK) {
    // Informações do arquivo
    $fileTmpPath = $_FILES['arquivo']['tmp_name']; // path temporario do arquivo 
    $fileName = $_FILES['arquivo']['name']; // nome do arquivo
    // Pega a extenção do arquivo
    $extencao = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    // cria um nome novo pro arquivo dentro do server para não sobrescrever arquivos com nome igual
    $newNameFile = uniqid();
    // Diretório para onde o arquivo será movido
    $pasta_server = 'uploads/';
    
    // Verifica se a pasta de uploads existe, se não cria
    if (!file_exists($pasta_server)) {
        mkdir($pasta_server, 0777, true);
    }


    // Caminho completo do arquivo final
    $destPath = $pasta_server . $newNameFile .".". $extencao;

    // Move o arquivo para o diretório de destino
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        echo true;
        if (file_exists($imgatual)) {
            unlink($imgatual); // Apaga o arquivo
        }
        $editar = $conn->prepare("UPDATE produtos SET Imagem = :img WHERE Id = :id");
        $editar->execute(array(
            ":id" => $id,
            ":img" => $destPath
        ));
    } else {
        echo "Ocorreu um erro ao mover o arquivo para o diretório de upload.";
    }
} else {

        echo true;

        $editar = $conn->prepare("UPDATE produtos SET Imagem = :img WHERE Id = :id");
        $editar->execute(array(
            ":id" => $id,
            ":img" => $destPath
        ));

}

