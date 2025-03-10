<?php
header("Content-Type: application/json");
require_once "db_conn.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Reading form data directly from $_POST
    if (!isset($_POST['employee_id']) || !isset($_POST['name']) || 
        !isset($_POST['contact']) || !isset($_POST['username']) || 
        !isset($_POST['password']) || !isset($_POST['role'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
        exit();
    }

    // Assign variables - using the names from your JS formData
    $employee_id = $_POST['employee_id'];
    $employee_name = $_POST['name'];
    $contact_number = $_POST['contact'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Update employee details
    $sql = "UPDATE employee SET employee_name = ?, contact_number = ?, username = ?, password = ?, role = ? WHERE employee_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $employee_name, $contact_number, $username, $password, $role, $employee_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Employee updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error updating employee: " . $stmt->error]);
    }

    // Close connections
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>