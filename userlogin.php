<?php
session_start();
include 'db_conn.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = isset($_POST['username']) ? trim($_POST['username']) : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    $role = isset($_POST['role']) ? $_POST['role'] : null;

    if (!$username || !$password || !$role || $role == "Select Role") {
        header("Location: userlogin.html?error=Please fill in all fields correctly!");
        exit();
    }

    $sql = "SELECT * FROM employee WHERE LOWER(username) = LOWER (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        if ($password === $user['password']) {
            if ($role !== $user['role']) {
                header("Location: userlogin.html?error=Selected role does not match our records!");
                exit();
            }

            $_SESSION['user_id'] = $user['employee_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            switch ($user['role']) {
                case "Admin":
                    header("Location: admin.html?success=Login Successfully");
                    exit();
                case "Product Manager":
                    header("Location: product.html?success=Login Successfully");
                    exit();
                case "Order Manager":
                    header("Location: order.html?success=Login Successfully");
                    exit();
                default:
                    header("Location: userlogin.html?error=Invalid role!");
                    exit();
            }
        } else {
            header("Location: userlogin.html?error=Incorrect password!");
            exit();
        }
    } else {
        header("Location: userlogin.html?error=Invalid username!");
        exit();
    }
}
?>
