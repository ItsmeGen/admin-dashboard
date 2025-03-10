<?php

header("Content-Type: application/json");
include 'db_conn.php';

$sql = "SELECT * FROM employee";

$stmt = $conn->prepare($sql);
$stmt->execute();

$result = $stmt->get_result();

$employee = [];
if($result ->num_rows > 0){
    while($data = $result->fetch_assoc()){
        $employee [] = $data;
    }

    echo json_encode($employee,JSON_PRETTY_PRINT);
}

?>