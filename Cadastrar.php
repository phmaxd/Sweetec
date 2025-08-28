<?php
include 'conecta.php';

    $nome = $_POST['Nome'];
    $senha = $_POST['Senha'];
    $escola = $_POST['Escolas'];
    $Numero = $_POST['Numero'];
header('Content-Type: application/json');
    if (!empty($nome) && !empty($senha)) {
        try {
            $stmt = $conn->prepare("INSERT INTO usuarios (Usuarios, Senha, Escola, Numero) VALUES (:nome, :senha, :Escola, :Numero)");
            $Senha = password_hash($senha, PASSWORD_DEFAULT);
            $stmt->execute(array(
                ':nome' => $nome,
                ':senha' => $Senha,
                ':Escola' => $escola,
                ':Numero' => $Numero
            ));
            echo json_encode(['data' => 'Usuário cadastrado com sucesso!']);
        } catch (PDOException $e) {
            echo json_encode(['data' => "Erro ao cadastrar: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(['data' => "usuario ja cadastrado"]);
    }



?>