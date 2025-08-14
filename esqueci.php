<?php
include 'conecta.php';

$nome = $_POST['Nome'] ?? '';
$senha = $_POST['Senha'] ?? '';

$esqueci = $conn->prepare("SELECT * FROM usuarios WHERE Usuarios = :nome");
$esqueci->execute([':nome' => $nome]);
if ($esqueci->rowCount() > 0) {
    $usuario = $esqueci->fetch(PDO::FETCH_ASSOC);
    $novaSenha = password_hash($senha, PASSWORD_DEFAULT);
    
    $update = $conn->prepare("UPDATE usuarios SET Senha = :novaSenha WHERE Usuarios = :nome");
    $update->bindParam(':novaSenha', $novaSenha);
    $update->bindParam(':nome', $nome);
    
    if ($update->execute()) {
        echo json_encode(['data' => 'Senha alterada com sucesso!']);
    } else {
        echo json_encode(['data' => 'Erro ao alterar a senha.']);
    }
} else {
    echo json_encode(['data' => 'Usuário não encontrado.']);
}
?>