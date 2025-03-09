<?php

header('Content-Type: application/json');
include 'db_conn.php';

$response = [
    'success' => false,
    'message' => ''
];

try {

    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);
    

    if (!isset($data['id']) || empty($data['id'])) {
        throw new Exception('Order ID is required');
    }
    
    $orderId = intval($data['id']);
    
 
    $conn->begin_transaction();
    
    try {
  
        $stmt = $conn->prepare("SELECT id FROM orders WHERE id = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            throw new Exception("Order #$orderId not found");
        }
        
    
        $stmt = $conn->prepare("DELETE FROM order_items WHERE order_id = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        
      
        $stmt = $conn->prepare("DELETE FROM orders WHERE id = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        
       
        if ($stmt->affected_rows > 0) {
          
            $conn->commit();
            
            $response['success'] = true;
            $response['message'] = "Order #$orderId was successfully deleted";
        } else {
            throw new Exception("Failed to delete order #$orderId");
        }
        
    } catch (Exception $e) {
       
        $conn->rollback();
        throw $e;
    }
    
    $conn->close();
    
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>