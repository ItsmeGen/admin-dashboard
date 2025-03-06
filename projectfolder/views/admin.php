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

</head>
<body>
    <div class="sidebar">
        <div class="logo"> 
            <img src="../img/Logo.png" alt="Computer Bucket">
        </div>
        <ul>
            <li><a href="#">Product Management</a></li>
            <li><a href="#">User Information</a></li>
            <li><a href="admin.order.html">Order Management</a></li>
            <li><a href="#" >Sales</a></li>
            <li><a href="#" >On Delivery</a></li>

            <button onclick="logout()">Log out</button>
        </ul>
    </div>

    <div class="content">
        <h2>Product List</h2>
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

    <script src="../javascript/admin.js"></script>
</body>
</html>