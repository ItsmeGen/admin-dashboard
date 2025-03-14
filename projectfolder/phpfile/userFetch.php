<?php
header("Content-Type: application/json");
include 'db_conn.php';

$sql = "SELECT * FROM users";

$stmt = $conn->prepare($sql);
$stmt ->execute();
$result = $stmt->get_result();

$users = [];
if($result ->num_rows > 0){
    while($user = $result->fetch_assoc()){
        $users []= $user;
    }
    echo json_encode($users,JSON_PRETTY_PRINT);
}else{
    echo "No Result Found";
}

$conn->close();
$stmt->close();

?>