<?php
session_start();
include 'db_conn.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = isset($_POST['username']) ? trim($_POST['username']) : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    $role = isset($_POST['role']) ? $_POST['role'] : null;

    if (!$username || !$password || !$role || $role == "Select Role") {
        header("Location: ../views/userlogin.html?error=Please fill in all fields correctly!");
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
                header("Location: ../views/userlogin.html?error=Selected role does not match our records!");
                exit();
            }
                
            }

            $_SESSION['user_id'] = $user['employee_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            switch ($user['role']) {
                case "Admin":
                    header("Location: ../views/admin.php?success=Login Successfully");
                    exit();
                case "Product Manager":
                    header("Location: ../views/product.php?success=Login Successfully");
                    exit();
                case "Order Manager":
                    header("Location: ../views/order.php?success=Login Successfully");
                    exit();
                case "User Manager":
                    header("Location: ../views/userManager.php?success=Login Successfully");
                    exit();
                default:
                    header("Location: ../views/userlogin.html?error=Invalid role!");
                    exit();
            }
        } else {
            header("Location: ../views/userlogin.html?error=Incorrect password!");
            exit();
        }
    } else {
        header("Location: ../views/userlogin.html?error=Invalid username!");
        exit();
    }

?>
