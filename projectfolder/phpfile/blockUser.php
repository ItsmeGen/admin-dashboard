<?php
header("Content-Type: application/json");
include 'db_conn.php';

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['id'];

if ($userId) {
    $sql = "UPDATE users SET status = 'blocked' WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid User ID"]);
}
?>
