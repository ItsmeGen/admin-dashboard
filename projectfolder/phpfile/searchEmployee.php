<?php
include 'db_conn.php'; // Include your database connection file

$searchTerm = isset($_GET['query']) ? $_GET['query'] : '';

$sql = "SELECT * FROM employee WHERE employee_id LIKE ? OR username LIKE ? OR employee_name LIKE ? OR role LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%$searchTerm%";
$stmt->bind_param("ssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

$employees = array();
while ($row = $result->fetch_assoc()) {
    $employees[] = $row;
}

echo json_encode($employees);
?>