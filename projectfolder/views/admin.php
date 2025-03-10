<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: userlogin.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Dashboard</title>
    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body>
    <div class="sidebar">
        <div class="logo"> 
            <img src="../img/Logo.png" alt="Computer Bucket">
        </div>
        <ul>
            <li><a href="#">Product Management</a></li>
            <li><a href="employeeInfo.php">Employee Management</a></li>
            <li><a href="admin.order.php">Order Management</a></li>
            <li><a href="#" >Sales</a></li>
            <li><a href="#" >On Delivery</a></li>

        </ul>
    </div>
    <div class="content">
        <div class="top-bar">
            <input type="text" placeholder="Search" id="search-bar">
            <img src="../img/profile.png" alt="profile" class="profile-pic" onclick="toggleMenu()">
        </div>
        <nav>
            <h2>Product List</h2>
                <div class="sub-menu-wrap-parent" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src="../img/profile.png" alt="profile" class="profile-pic">
                            <h4>Admin</h4>
                        </div>
                        <hr>

                        <a href="#" class="sub-menu-link">
                            <img src="../img/profile.png" alt="profile">
                            <p>Edit Profile</p>
                            <span></span>
                        </a>
                        <a href="#" class="sub-menu-link">
                            <img src="../img/setting.png" alt="profile">
                            <p>settings & Privacy</p>
                            <span></span>
                        </a>
                        <a href="#" class="sub-menu-link">
                            <img src="../img/help.png" alt="profile">
                            <p>Help & Support</p>
                            <span></span>
                        </a>
                        <a href="#" class="sub-menu-link">
                            <img src="../img/logout.png" alt="profile">
                            <button onclick="logout()">Log out</button>
                            <span></span>
                        </a>
                </div>
        </nav>
        <table>
            <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Product Price</th>
                    <th>Product Sold</th>
                    <th>Image Url</th>
                    <th>Product Stock</th>
                </tr>
            </thead>
            <tbody id="productTable">
            </tbody>
        </table>
    </div>
</body>
<script src="../javascript/admin.js"></script>
</html>