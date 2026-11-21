<?php
include 'conecta.php';

session_start();

$id=$_SESSION['usuario'];

$vb = "SELECT * FROM usuarios WHERE Id = " . $id . ";";
$stmt = $conn->query($vb);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

echo "
<section id='modalConta'>
    <h1>Conta</h1>
    
    <span id='usuarioM'>
        <label>Usuário:</label> " . $row["Usuarios"] . " 
        <i tabindex='0' 
           onkeydown='if(event.key===\"Enter\") editarConta(\"".$id."\", \"usuarioM\",\"" . $row["Usuarios"] . "\", \"Usuarios\")' 
           onclick='editarConta(\"".$id."\", \"usuarioM\",\"" . $row["Usuarios"] . "\", \"Usuarios\")' 
           class='fa-solid fa-pen-to-square editar'></i>
    </span>
    
    <span id='escolaM'>
        <label>Escola:</label> " . $row["Escola"] . " 
        <i tabindex='0' 
           onkeydown='if(event.key===\"Enter\") editarConta(\"".$id."\", \"escolaM\",\"" . $row["Escola"] . "\", \"Escola\")' 
           onclick='editarConta(\"".$id."\", \"escolaM\",\"" . $row["Escola"] . "\", \"Escola\")' 
           class='fa-solid fa-pen-to-square editar'></i>
    </span>
    
    <span id='numeroM'>
        <label>Número:</label> " . $row["Numero"] . " 
        <i tabindex='0' 
           onkeydown='if(event.key===\"Enter\") editarConta(\"".$id."\", \"numeroM\",\"" . $row["Numero"] . "\", \"Numero\")' 
           onclick='editarConta(\"".$id."\", \"numeroM\",\"" . $row["Numero"] . "\", \"Numero\")' 
           class='fa-solid fa-pen-to-square editar'></i>
    </span>
    
    <a style='font-size:2.5vh;' href='Esqueci'>Alterar senha</a>
</section>
";



?>