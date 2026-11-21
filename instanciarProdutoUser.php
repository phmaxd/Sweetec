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
            <img id='imagemP' title='".$resultado['Nome']."' src='" . $resultado['Imagem'] . "'>
            <section id='emBaixoIMG'>
                <span tabindex='0' onkeydown=\"if(event.key==='Enter') apagarProduto(".$id.")\"  id='apagar' onclick='apagarProduto(".$id.")'>Apagar produto</span>
                <i tabindex='0' id='iIMG' onkeydown=\"if(event.key==='Enter') editarImagem(".$id.",'imagemP', '".$resultado['Imagem']."')\" onclick='editarImagem(".$id.",\"imagemP\", \"".$resultado['Imagem']."\")' class='fa-solid fa-pen-to-square editar'></i>
            </section>
        </section>
        <section id='ladoEsquerdoP'>
            <span id='nomeP'>".$resultado['Nome']." <i tabindex='0' onkeydown=\"if(event.key==='Enter') editar('Nome',".$id.", 'nomeP', '".$resultado['Nome']."')\" onclick='editar(\"Nome\",".$id.",\"nomeP\", \"".$resultado['Nome']."\")' class='fa-solid fa-pen-to-square editar'></i></span> 
            <span id='precoP'>R$ " . $resultado['preco'] . " <i tabindex='0' onkeydown=\"if(event.key==='Enter') editar('preco',".$id.", 'precoP', '".$resultado['preco']."')\" onclick='editar(\"preco\",".$id.",\"precoP\", \"".$resultado['preco']."\")' class='fa-solid fa-pen-to-square editar'></i></span>
            <span id='descricaoP'>" . $resultado['Descricao'] . " <i tabindex='0' onkeydown=\"if(event.key==='Enter') editar('Descricao',".$id.", 'descricaoP', '".$resultado['Descricao']."')\" onclick='editar(\"Descricao\",".$id.",\"descricaoP\", \"".$resultado['Descricao']."\")' class='fa-solid fa-pen-to-square editar'></i></span>
                <section id='contato'>
                    <span id='usuariosP'>Entre em contato:</span>
                    <span id='noneP'>Vendedor: " . $resultado['Usuarios'] . "</span>
                    <span id='numeroP'>Telefone: " . $resultado['Numero'] . "</span>
                    <span id='escolaP'>" . $resultado['Escola'] . "</span>
                </section>
        </section>
    </section>"
;