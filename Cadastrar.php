<?php
require 'conecta.php';
    $nome = $_POST['Nome'];
    $senha = $_POST['Senha'];
header('Content-Type: application/json');
    if (!empty($nome) && !empty($senha)) {
        try {
            $stmt = $conn->prepare("INSERT INTO usuarios (Usuarios, Senha) VALUES (:nome, :senha)");
            $Senha = password_hash($senha, PASSWORD_DEFAULT);
            $stmt->execute(array(
                ':nome' => $nome,
                ':senha' => $Senha
            ));
            echo json_encode(['data' => 'Usuário cadastrado com sucesso!']);
        } catch (PDOException $e) {
            echo json_encode(['data' => "Erro ao cadastrar: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(['data' => "usuario ja cadastrado"]);
    }



?>