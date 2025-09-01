<?php 

include "conecta.php";
session_start();

// Pega os produtos do usuário
$exibir = "SELECT * FROM userproduto WHERE usuarios = :usuario;";
$stmt = $conn->prepare($exibir);
$stmt->bindValue(':usuario', $_SESSION['usuario']);
$stmt->execute();

// Prepara consulta para os detalhes dos produtos
$exibir2 = "SELECT * FROM produtos WHERE Id = :produto;";
$stmt2 = $conn->prepare($exibir2);

if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $stmt2->bindValue(':produto', $row['produtos']);
        $stmt2->execute();
        $row2 = $stmt2->fetch(PDO::FETCH_ASSOC);

        if ($row2) {
            echo "
                <div class='card' tabindex='0' onkeydown=\"if(event.key==='Enter') visualizarProduto(".$row2['Id'].")\" onclick='visualizarProduto(".$row2['Id'].")'>
                  <div class='cardContent' data-id='".$row2['Id']."' >
                    <img src='".$row2['Imagem']."' title='".$row2['Nome']."' alt='Imagem do produto' style='width: 32.7vh; height: 32.7vh; border-radius: 1vh;'>
                    <span><p id='nome'> ".$row2['Nome']."</p></span>
                    <span style='display:none;'><p>".$row2['Descricao']."</p></span>
                    <span style='display:none;'>".$row2['Escola']."</span>
                    <span id='Dados' style='display:none;'>".$row2['Id']."</span>
                    <span id='Preco'> R$ ".$row2['preco']."</span>
                  </div>
                </div>
            ";
        }
    }
} else {
    echo "Você não possui produtos cadastrados.";
}
?>
