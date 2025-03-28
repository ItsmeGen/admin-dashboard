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
            <li><a href="admin.php">Product Management</a></li>
            <li><a href="#">Employee Management</a></li>
            <li><a href="admin.order.php">Order Management</a></li>
            <li><a href="admin.userManager.php" >Users Management</a></li>
            <li><a href="#">On Delivery</a></li>
            <li><a href="#">Delivered</a></li>
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
            <h2>Employee Management</h2>
            <button id="addProductBtn">Add Employee +</button>
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
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Contact Number</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="table">
            </tbody>
        </table>
    </div>

    <!-- Employee Edit Modal -->
<div id="editEmployeeModal" class="modal">
    <div class="modal-content">
        <div class="close_btn">
            <span class="edit-close">&times;</span>
        </div>
        <h2>Edit Employee</h2>
        <div class="form-container">
            <form id="editEmployeeForm">
                <input type="hidden" id="editEmployeeId" name="employeeId">

                <label for="editEmployeeName">Employee Name:</label>
                <input type="text" id="editEmployeeName" name="employeeName" required>

                <label for="editContactNumber">Contact Number:</label>
                <input type="text" id="editEmployeeContact" name="contactNumber" required>

                <label for="editUsername">Username:</label>
                <input type="text" id="editEmployeeUsername" name="username" required>

                <label for="editPassword">Password:</label>
                <input type="text" id="editEmployeePassword" name="password" required>

                <label for="editRole">Role:</label>
                <input type="text" id="editEmployeeRole" name="role" required>

                <button type="submit" id="updateEmployeeBtn">Update</button>
            </form>
        </div>
    </div>
</div>

<!-- Add Employee Modal -->
<div id="addEmployeeModal" class="modal">
    <div class="modal-content">
        <div class="close_btn">
            <span class="add-close">&times;</span>
        </div>
        <h2>Add New Employee</h2>
        <div class="form-container">
            <form id="addEmployeeForm">
                <label for="addEmployeeName">Employee Name:</label>
                <input type="text" id="addEmployeeName" name="employeeName" required>

                <label for="addContactNumber">Contact Number:</label>
                <input type="text" id="addContactNumber" name="contactNumber" required>

                <label for="addUsername">Username:</label>
                <input type="text" id="addUsername" name="username" required>

                <label for="addPassword">Password:</label>
                <input type="text" id="addPassword" name="password" required>

                <label for="addRole">Role:</label>
                <input type="text" id="addRole" name="role" required>

                <button type="submit" id="submitEmployeeBtn">Add Employee</button>
            </form>
        </div>
    </div>
</div>


</body>
<script src="../javascript/employees.js"></script>
</html>