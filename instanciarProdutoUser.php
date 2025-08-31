<?php

include "conecta.php";

$id = $_POST['id'] ?? null;

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



echo "

    <section id='produtoContent'>
    
        <section id='ladoDireitoP'>
            <img id='imagemP' src='" . $resultado['Imagem'] . "'>
            <span id='apagar' onclick='apagarProduto(".$id.")'>Apagar produto</span>
        </section>
        <section id='ladoEsquerdoP'>
            <span id='nomeP'>".$resultado['Nome']." </span>
            <span id='precoP'>R$ " . $resultado['preco'] . "</span>
            <span id='descricaoP'>" . $resultado['Descricao'] . " </span>
                <section id='contato'>
                    <span id='usuariosP'>Entre em contato:</span>
                    <span id='noneP'>Vendedor: " . $resultado['Usuarios'] . "</span>
                    <span id='numeroP'>Telefone: " . $resultado['Numero'] . "</span>
                    <span id='escolaP'>" . $resultado['Escola'] . "</span>
                </section>
        </section>
    </section>"
;