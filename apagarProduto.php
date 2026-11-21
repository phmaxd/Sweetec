<?php

include 'conecta.php';
    //inclui o codigo da conexão com o banco

$id = $_POST['id'];
    //define que $id é igual ao id enviado pelo ajax na funcão apagarMateria

    
    $exibir = "SELECT * from produtos WHERE Id=".$id.";";
    $delete = "DELETE FROM produtos WHERE Id = '".$id."';";
    $delete2 = "DELETE FROM userproduto WHERE produtos = '".$id."';";
        //comandos sql que apagam as tabelas no banco que correspondem à o botao X clicado

   
    $stmt = $conn->query($exibir);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

if($row){
    $imgatual= $row["Imagem"];
    if (file_exists($imgatual)) {
        unlink($imgatual); // Apaga o arquivo
    }

};
        //executa os comandos sql
 $conn->query($delete);
 $conn->query($delete2);
include 'produtosUser.php';
        //inclui o codigo que carrega a pagina principal com os cards das disciplinas
    
     
    ?>