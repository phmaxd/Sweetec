<?php
include 'conecta.php';

session_start();
if (!isset($_SESSION['usuario'])) {
    echo 'erro: usuário não autenticado';
    exit;
}

$nome = $_POST['nome'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$preco = $_POST['preco'] ?? '';
$arquivo = $_FILES['imagem'] ?? '';
$escola = $_SESSION['escola'] ?? '';
if (isset($arquivo) && isset($nome) && isset($descricao) && isset($preco)) {
    $caminhoTemporario = $arquivo['tmp_name'];
    if (!file_exists('imagens/')) {
        mkdir('imagens/', 0777, true);
    }
    $extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
    $novoNome = "imagens/" . uniqid() . '.' . $extensao;
    if (move_uploaded_file($caminhoTemporario, $novoNome)) {
        try {
            $sql = "INSERT INTO produtos VALUES(:Nome,:Descricao,null,:Imagem,:preco,:Escola)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                ':Nome' => $nome,
                ':Descricao' => $descricao,
                ':Imagem' => $novoNome,
                ':preco' => $preco,
                ':Escola' => $escola
            ]);
            $inserir = "INSERT INTO userproduto VALUES (:usuarios, :produtos, null)";
            $manda = $conn->prepare($inserir);
            $manda->execute([
                ':usuarios' => $_SESSION['usuario'],
                ':produtos' => $conn->lastInsertId()
            ]);
            echo 'Produto cadastrado com sucesso!';
        } catch (\Throwable $th) {
            echo 'error ao cadastrar o produto: ' . $th->getMessage();
        }
    } else {
        echo 'erro ao enviar o arquivo';
    }
} else {
    echo 'erro ao enviar o arquivo ou dados incompletos';
}
?>