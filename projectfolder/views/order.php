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

</head>
<body>
    <div class="sidebar">
        <div class="logo"> 
            <img src="../img/Logo.png" alt="Computer Bucket">
        </div>
        <ul>
            <li><a href="#" style="pointer-events: none; color: gray;">Product Management</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">User Information</a></li>
            <li>Order Management</li>
            <li><a href="#" style="pointer-events: none; color: gray;">Sales</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">On Delivery</a></li>
        </ul>
    </div>

    <div class="content">
        <h2>Order List</h2>
        <table>
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>User Id</th>
                    <th>Customer Name</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Product name</th>
                    <th>Product Price</th>
                    <th>Product quantity</th>
                    <th>Total Price</th>
                    <th>Order Status</th>
                    <th>Ordered at</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="productTable">
            </tbody>
        </table>
    </div>
    <script src="../javascript/order.js"></script>
</body>
</html>