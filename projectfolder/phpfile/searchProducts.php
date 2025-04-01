<?php
include 'db_conn.php'; // Include your database connection file

$searchTerm = isset($_GET['query']) ? $_GET['query'] : '';

$sql = "SELECT * FROM products WHERE product_name LIKE ? OR product_description LIKE ? OR product_price LIKE ? OR product_sold LIKE ? OR product_stock LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%$searchTerm%";
$stmt->bind_param("sssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

$products = array();
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>