<?php

try {
    $conn = new PDO('mysql:host=localhost;port=3306;dbname=Sweetec', 'root', '');
    $conn-> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['data' => 'error: ' . $e->getmessage()]);
}


?>