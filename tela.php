<?php
include 'conecta.php';

try {

    $select = $conn->prepare("SELECT * FROM produtos ORDER BY Nome ASC");
    $select->execute();

    $dados = $select->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode([
        'success' => true,
        'data' => $dados
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}