<?php
header("Content-Type: application/json");
include 'db_conn.php';

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['id'];
$action = isset($data['action']) ? $data['action'] : '';

if ($userId) {
  
    $checkSql = "SELECT status FROM users WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("i", $userId);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    $user = $result->fetch_assoc();
    $checkStmt->close();
    

    $newStatus = 'active'; 
    
    if ($action === 'unblock') {
        $newStatus = 'active';
    } else if ($action === 'block') {
        $newStatus = 'blocked';
    } else {
        
        $newStatus = ($user['status'] === 'blocked') ? 'active' : 'blocked';
    }
    
   
    $updateSql = "UPDATE users SET status = ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("si", $newStatus, $userId);
    
    if ($updateStmt->execute()) {
        echo json_encode([
            "success" => true, 
            "new_status" => $newStatus,
            "message" => $newStatus === 'blocked' ? "User has been blocked" : "User has been unblocked"
        ]);
    } else {
        echo json_encode(["success" => false, "error" => $updateStmt->error]);
    }
    $updateStmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid User ID"]);
}
?>