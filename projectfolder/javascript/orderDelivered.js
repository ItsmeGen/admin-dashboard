document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    // PHP Toastify Messages
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const success = params.get('success');

    if (error) {
        Toastify({
            text: error,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
        }).showToast();
    }
    if (success) {
        Toastify({
            text: success,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "green",
        }).showToast();
    }

    async function orderfetch() {
        try {
            console.log("Fetching data from API...");
            const response = await fetch('../phpfile/orderDelivered.php');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const orders = await response.json();

            let tableBody = document.getElementById('orderTable');
            if (!tableBody) {
                console.error("Error: orderTable element not found.");
                return;
            }
            tableBody.innerHTML = '';

            orders.forEach((order) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.user_id}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.customer_phone}</td>
                    <td>${order.customer_address}</td>
                    <td>${order.product_name}</td>
                    <td>${order.price}</td>
                    <td>${order.quantity}</td>
                    <td>${order.total_price}</td>
                    <td>${order.payment_method}</td>
                    <td>${order.order_status}</td>
                    <td>${order.created_at}</td>
                    <td>${order.tracking_number}</td>
                `;
                tableBody.appendChild(row);
            });

            setupStatusDropdowns();
            setupDeleteButtons();
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    orderfetch();

   
});

function toggleMenu() {
    var subMenu = document.getElementById("subMenu");
    if (subMenu.classList.contains("open-menu")) {
        subMenu.classList.remove("open-menu");
        document.body.classList.remove("menu-open");
    } else {
        subMenu.classList.add("open-menu");
        document.body.classList.add("menu-open");
    }
}
document.addEventListener("click", function(event) {
    var subMenu = document.getElementById("subMenu");
    var profilePic = document.querySelector(".profile-pic");
    if (!subMenu.contains(event.target) && !profilePic.contains(event.target)) {
        subMenu.classList.remove("open-menu");
        document.body.classList.remove("menu-open");
    }
});

async function logout() {
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#254d32",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "Cancel"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                let response = await fetch("../phpfile/logout.php", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                let data = await response.json();

                if (data.status === "success") {
                    Swal.fire({
                        title: "Logged Out!",
                        text: data.message,
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });

                    setTimeout(() => {
                        window.location.href = "../views/userlogin.html";
                    }, 1000);
                }
            } catch (error) {
                console.error("Logout failed:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Logout failed. Please try again.",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        }
    });
}

document.getElementById('search-bar').addEventListener('keyup', function () {
    const query = this.value.trim(); // Get the search query from the input field

    // Send an AJAX request to the PHP script
    fetch(`../phpfile/search_orders.php?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const orderTable = document.getElementById('orderTable');
            orderTable.innerHTML = ''; // Clear the table body

            // Populate the table with the search results
            if (data.length > 0) {
                data.forEach(order => {
                    if (order.order_status === "Delivered") { // Check for "Out for Delivery" status
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${order.id}</td>
                            <td>${order.user_id}</td>
                            <td>${order.customer_name}</td>
                            <td>${order.customer_phone}</td>
                            <td>${order.customer_address}</td>
                            <td>${order.product_name}</td>
                            <td>${order.price}</td>
                            <td>${order.quantity}</td>
                            <td>${(order.price * order.quantity).toFixed(2)}</td>
                            <td>${order.payment_method}</td>
                            <td>${order.order_status}</td>
                            <td>${order.created_at}</td>
                            <td>${order.tracking_number}</td>
                        `;
                        orderTable.appendChild(row);
                    }
                });
            } else {
                // If no results, display a message
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="13" style="text-align: center;">No orders found</td>
                `;
                orderTable.appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
});

// Initial fetch of all orders (empty query)
fetchOrders();

// Function to fetch all orders
function fetchOrders(query = "") {
    fetch(`../phpfile/search_orders.php?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const orderTable = document.getElementById('orderTable');
            orderTable.innerHTML = ''; // Clear the table body

            if (data.length > 0) {
                data.forEach(order => {
                    if (order.order_status === "Deliverd") { // Check for "Out for Delivery" status
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${order.id}</td>
                            <td>${order.user_id}</td>
                            <td>${order.customer_name}</td>
                            <td>${order.customer_phone}</td>
                            <td>${order.customer_address}</td>
                            <td>${order.product_name}</td>
                            <td>${order.price}</td>
                            <td>${order.quantity}</td>
                            <td>${(order.price * order.quantity).toFixed(2)}</td>
                            <td>${order.payment_method}</td>
                            <td>${order.order_status}</td>
                            <td>${order.created_at}</td>
                            <td>${order.tracking_number}</td>
                        `;
                        orderTable.appendChild(row);
                    }
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="13" style="text-align: center;">No orders found</td>
                `;
                orderTable.appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
}