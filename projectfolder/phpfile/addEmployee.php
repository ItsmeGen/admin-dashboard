<?php
header("Content-Type: application/json");
require_once "db_conn.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Reading form data directly from $_POST
    if (!isset($_POST['name']) || !isset($_POST['contact']) || 
        !isset($_POST['username']) || !isset($_POST['password']) || 
        !isset($_POST['role'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
        exit();
    }

    // Assign variables
    $employee_name = $_POST['name'];
    $contact_number = $_POST['contact'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

  
    $check_sql = "SELECT * FROM employee WHERE username = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $username);
    $check_stmt->execute();
    $result = $check_stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Username already exists. Please choose another."]);
        $check_stmt->close();
        $conn->close();
        exit();
    }
    $check_stmt->close();


    $sql = "INSERT INTO employee (employee_name, contact_number, username, password, role) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $employee_name, $contact_number, $username, $password, $role);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Employee added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error adding employee: " . $stmt->error]);
    }

    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>