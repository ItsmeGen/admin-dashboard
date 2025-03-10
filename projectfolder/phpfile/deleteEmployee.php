<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization");

include 'db_conn.php';

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    echo json_encode(["status" => "error", "message" => "Invalid request method. Use DELETE."]);
    exit();
}


if (!isset($_GET["id"])) {
    echo json_encode(["status" => "error", "message" => "Employee ID is required."]);
    exit();
}

$employee_id = intval($_GET["id"]);

if ($employee_id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid Employee ID."]);
    exit();
}

try {
    $stmt = $conn->prepare("DELETE FROM employee WHERE employee_id = ?");
    $stmt->bind_param("i", $employee_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Employee deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete employee."]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
?>
