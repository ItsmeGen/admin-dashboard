<?php
include 'db_conn.php'; // Include your database connection file

$searchTerm = isset($_GET['query']) ? $_GET['query'] : '';

$sql = "SELECT orders.id, orders.user_id, orders.customer_name, orders.customer_phone, orders.customer_address,
        orders.order_status, orders.created_at, order_items.product_name, order_items.quantity, order_items.price,
        orders.tracking_number, orders.payment_method, orders.total_price
        FROM orders
        INNER JOIN order_items ON orders.id = order_items.order_id
        WHERE orders.customer_name LIKE ? OR orders.customer_phone LIKE ? OR orders.customer_address LIKE ? OR 
              orders.order_status LIKE ? OR orders.payment_method LIKE ? OR orders.tracking_number LIKE ? OR 
              orders.total_price LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%$searchTerm%";
$stmt->bind_param("sssssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

$orders = array();
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>