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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body>
    <div class="sidebar">
        <div class="logo"> 
            <img src="../img/Logo.png" alt="Computer Bucket">
        </div>
        <ul>
            <li class="active">Products Management</li>
            <li><a href="#" style="pointer-events: none; color: gray;">Employee Management</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">Order Management</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">Sales</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">On Delivery</a></li>
        </ul>
    </div>

    <div class="content">
        <div class="top-bar">
            <input type="text" placeholder="Search" id="search-bar">
            <img src="../img/profile.png" alt="profile" class="profile-pic" onclick="toggleMenu()">
        </div>
        <nav>
            <h2>Product List</h2>
            <button id="addProductBtn">Add Product +</button>

                <div class="sub-menu-wrap-parent" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src="../img/profile.png" alt="profile" class="profile-pic">
                            <h4>Product Manager</h4>
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
        <table class="content-table">
            <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Product Price</th>
                    <th>Product Sold</th>
                    <th>Image Url</th>
                    <th>Product Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="productTable">
            </tbody>
        </table>
    </div>

    <div id="productModal" class="modal">
        <div class="modal-content">
            <div class="close_btn">
                <span class="close">&times;</span>
            </div>
            <h2>Add Product</h2>
            <div class="form-container">
            <form action="../phpfile/addProduct.php" method="POST" id="productForm">

                <label for="productName">Product Name:</label>
                <input type="text" id="productName" name="productName" required>
            
                <label for="Product Description">Product Description:</label>
                <input type="text" id="category" name="productDescription" required>
            
                <label for="productPrice">Product Price:</label>
                <input type="number" id="price" name="productPrice" required>
            
                <label for="productSold">Product Sold</label>
                <input type="number" id="quantity" name="productSold" required>
            
                <label for="imageURl`">Product imageURl:</label>
                <input id="description" name="productImgUrl" required></input>
            
                <label for="imageUrl">Product Stock:</label>
                <input type="text" name="productStock" placeholder="Stock" required>
        
                <button type="submit">Add</button>
            </form>
            </div>
        </div>
    </div>

            <div id="editProductModal" class="modal">
    <div class="modal-content">
        <div class="close_btn">
            <span class="edit-close">&times;</span>
        </div>
        <h2>Edit Product</h2>
        <div class="form-container">
            <form id="editProductForm" action="editProduct.php" method="POST">
                <input type="hidden" id="editProductId" name="productId">

                <label for="editProductName">Product Name:</label>
                <input type="text" id="editProductName" name="productName" required>

                <label for="editProductDescription">Product Description:</label>
                <input type="text" id="editProductDescription" name="productDescription" required>

                <label for="editProductPrice">Product Price:</label>
                <input type="number" id="editProductPrice" name="productPrice" required>

                <label for="editProductSold">Product Sold:</label>
                <input type="number" id="editProductSold" name="productSold" required>

                <label for="editProductImageUrl">Product Image URL:</label>
                <input type="text" id="editProductImageUrl" name="productImgUrl" required>

                <label for="editProductStock">Product Stock:</label>
                <input type="number" id="editProductStock" name="productStock" required>

                <button type="submit" id="updateProductBtn">Update</button>
            </form>
        </div>
    </div>
</div>

    <div id="productDetailsModal" class="modal">
        <div class="modal-content">
            <span class="close-details">&times;</span>
            <h2>Product Details</h2>
            <div id="productDetailsContent">
            </div>
        </div>
    </div>

</body>
<script src="../javascript/mainfunction.js"></script>  
</html>