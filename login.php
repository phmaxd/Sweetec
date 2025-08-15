<?php
include 'conecta.php';

$nome = $_POST['Nome'] ?? '';
$senha = $_POST['Senha'] ?? '';

$verificacao = $conn->prepare("SELECT * FROM usuarios WHERE Usuarios = :nome");
$verificacao->bindParam(':nome', $nome);
$verificacao->execute();

if ($verificacao->rowCount() > 0) {
    $usuario = $verificacao->fetch(PDO::FETCH_ASSOC);
    if (password_verify($senha, $usuario['Senha'])) {
        session_start();
        $_SESSION['usuario'] = $usuario['Usuarios'];
        echo json_encode(['data' => 'Login realizado com sucesso']);
    } else {
        echo json_encode(['data' => "usuario ou senha incorreto"]);
    }
} else {
    echo json_encode(['data' => "usuario ou senha incorreto"]);
}

?>