<?php
include 'conecta.php';

session_start();



$vb = "SELECT * FROM usuarios WHERE Id = " . $_SESSION['usuario'] . ";";
$stmt = $conn->query($vb);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo "<p>Usuário: " . $row["Usuarios"] . "</p>";
echo "<p>Escola: " . $row["Escola"] . "</p>";
echo "<p>Número: " . $row["Numero"] . "</p>";
echo "<a href='Esqueci'>Alterar senha</a>";

?>