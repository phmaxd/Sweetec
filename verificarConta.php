<?php
include 'conecta.php';

session_start();



$vb = "SELECT * FROM usuarios WHERE Id = " . $_SESSION['usuario'] . ";";
$stmt = $conn->query($vb);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo $row["Usuarios"];

?>