<?php
include 'db_conn.php'; // Include your database connection file

$searchTerm = isset($_GET['query']) ? $_GET['query'] : '';

$sql = "SELECT * FROM users WHERE username LIKE ? OR email LIKE ? OR status LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%$searchTerm%";
$stmt->bind_param("sss", $searchTerm, $searchTerm, $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

$users = array();
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>