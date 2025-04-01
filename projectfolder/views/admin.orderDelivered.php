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
    <title>Order Dashboard</title>
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
        <li><a href="admin.php">Product Management</a></li>
            <li><a href="employeeInfo.php">Employee Management</a></li>
            <li><a href="admin.order.php">Order Management</a></li>
            <li><a href="admin.userManager.php" >Users Management</a></li>
            <li><a href="admin.outfordelivery.php">On Delivery</a></li>
            <li class="active"><a href="#">Delivered</a></li>
            <li><a href="#" >Sales</a></li>
            <li><a href="#">Product Returned</a></li>
        </ul>
    </div>
    <div class="content">
        <div class="top-bar">
            <input type="text" placeholder="Search" id="search-bar">
            <img src="../img/profile.png" alt="profile" class="profile-pic" onclick="toggleMenu()">
        </div>
        <nav>
            <h2>Delivered List</h2>
                <div class="sub-menu-wrap-parent" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src="../img/profile.png" alt="profile" class="profile-pic">
                            <h4>Order Manager</h4>
                        </div>
                        <hr>
                        <a href="#" class="sub-menu-link">
                            <img src="../img/logout.png" alt="profile">
                            <button onclick="logout()">Log out</button>
                            <span></span>
                        </a>
                </div>
        </nav>
        <table border="0">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>User Id</th>
                    <th>Customer Name</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Quantity</th>
                    <th>Total Price</th>
                    <th>Payment Method</th>
                    <th>Order Status</th>
                    <th>Ordered At</th>
                    <th>Tracking Number</th>
                </tr>
            </thead>
            <tbody id="orderTable">
            </tbody>
        </table>
    </div>
</body>
<script src="../javascript/admin.orderDelivered.js"></script>
</html>
