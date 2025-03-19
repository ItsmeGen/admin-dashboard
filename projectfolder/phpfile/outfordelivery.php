<?php
header("Content-Type: application/json");
include "db_conn.php";

$sql = "SELECT orders.id, orders.user_id, orders.customer_name, orders.customer_phone, orders.customer_address,
        orders.order_status,
         orders.created_at, order_items.product_name, order_items.quantity, order_items.price,
         orders.tracking_number, orders.payment_method, orders.total_price
        FROM orders 
        INNER JOIN order_items ON orders.id = order_items.order_id
        WHERE orders.order_status = 'Out for Delivery'"; 

$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->execute(); 
    $result = $stmt->get_result(); 

    $items = [];

    if ($result->num_rows > 0) {
        while ($item = $result->fetch_assoc()) {
            $items[] = $item; 
        }
    }

    echo json_encode($items, JSON_PRETTY_PRINT); 
    $stmt->close();
} else {
    echo json_encode(["error" => "Query preparation failed: " . $conn->error]);
}

$conn->close(); 
?>
