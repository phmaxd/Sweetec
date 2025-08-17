<?php
include 'conecta.php';

    $nome = $_POST['Nome'];
    $senha = $_POST['Senha'];
    $escola = $_POST['Escolas'];
header('Content-Type: application/json');
    if (!empty($nome) && !empty($senha)) {
        try {
            $stmt = $conn->prepare("INSERT INTO usuarios (Usuarios, Senha, Escola) VALUES (:nome, :senha, :Escola)");
            $Senha = password_hash($senha, PASSWORD_DEFAULT);
            $stmt->execute(array(
                ':nome' => $nome,
                ':senha' => $Senha,
                ':Escola' => $escola
            ));
            echo json_encode(['data' => 'Usuário cadastrado com sucesso!']);
        } catch (PDOException $e) {
            echo json_encode(['data' => "Erro ao cadastrar: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(['data' => "usuario ja cadastrado"]);
    }



?>