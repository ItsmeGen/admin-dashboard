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
    <title>User Management</title>
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
        <li><a href="#" style="pointer-events: none; color: gray;">Product Management</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">Employee Management</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">Order Management</a></li>
            <li><a href="#" style="pointer-events: none; color: gray;">Employee Management</a></li>
            <li><a href="#">User Management</a></li>
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
            <h2>User List</h2>
                <div class="sub-menu-wrap-parent" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src="../img/profile.png" alt="profile" class="profile-pic">
                            <h4>User Manager</h4>
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
                    <th>User Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Account Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="userTable">
            </tbody>
        </table>
    </div>
</body>
<script src="../javascript/userManager.js"></script>
</html>