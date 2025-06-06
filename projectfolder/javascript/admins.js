document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM fully loaded");

      //PHP TOASTIFY 
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

    fetchProducts();
    //Product fetch for debugging
    async function fetchProducts() {
        try {
            console.log("Fetching products...");
            const response = await fetch("../phpfile/productFetch.php");
            const data = await response.json();
            console.log("Products received:", data);
    
            let tableBody = document.getElementById("productTable");
            if (!tableBody) {
                console.error("Error: productTable element not found.");
                return;
            }
    
            tableBody.innerHTML = "";
    
            data.forEach((product) => {
                let row = `
                    <tr>
                        <td>${product.product_id}</td>
                        <td>${product.product_name}</td>
                        <td>${product.product_description}</td>
                        <td>${product.product_price}</td>
                        <td>${product.product_sold}</td>
                        <td>
                            <img src="${product.product_imgUrl}" width="100" alt="Product Image">
                        </td>
                        <td>${product.product_stock}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    //order fetch function for debugging
    async function orderfetch() {
        try {
            const response = await fetch('../phpfile/orderfetch.php');
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
                    <td>${(order.price * order.quantity).toFixed(2)}</td>
                    <td>${order.payment_method}</td>
                    <td>${order.order_status}</td>
                    <td>${order.created_at}</td>
                    <td>${order.tracking_number}</td>
                `;
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    orderfetch();

    //user fetch for debugging
    async function userFetch() {
        const response = await fetch('../phpfile/userFetch.php', {
            headers: { 'Content-Type': 'application/json' }
        });
        const users = await response.json();
    
        let tbody = document.getElementById('userTable');
        tbody.innerHTML = '';
    
        users.forEach((user) => {
            let newTable = document.createElement('tr');
            newTable.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.status}</td>
                <td>${user.created_at}</td>
                <td>
                    <button class="block-user" data-id="${user.id}" data-status="${user.status}">
                        ${user.status === 'blocked' ? 'Unblock' : 'Block'}
                    </button>
                </td>
            `;
            tbody.appendChild(newTable);
        });
    
        // Attach event listeners after rendering
        document.querySelectorAll('.block-user').forEach(button => {
            button.addEventListener('click', async function() {
                let userId = this.getAttribute('data-id');
                let newStatus = await blockUser(userId, this);
                this.textContent = newStatus === 'blocked' ? 'Unblock' : 'Block';
            });
        });
    }
    
    async function blockUser(userId, button) {
        const confirmAction = await Swal.fire({
            title: "Are you sure?",
            text: "You want to block the user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#254d32",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Block it!"
        });
    
        if (!confirmAction.isConfirmed) {
            return;
        }
    
        const response = await fetch('../phpfile/blockUser.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId })
        });
    
        const result = await response.json();
    
        if (result.success) {
            Swal.fire({
                title: "Success!",
                text: `User has been ${result.new_status}.`,
                icon: "success"
            });
            return result.new_status;
        } else {
            Swal.fire({
                title: "Error!",
                text: "Failed to update user status.",
                icon: "error"
            });
        }
    }
    
    userFetch();
    
});



// Function to block/unblock a user
async function blockUser(userId, button) {
    const confirmAction = await Swal.fire({
        title: "Are you sure?",
        text: "You want to block the user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#254d32",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block it!"
    });

    if (!confirmAction.isConfirmed) {
        return;
    }

    const response = await fetch('../phpfile/blockUser.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId })
    });

    const result = await response.json();

    if (result.success) {
        Swal.fire({
            title: "Success!",
            text: `User has been ${result.new_status}.`,
            icon: "success"
        });
        return result.new_status;
    } else {
        Swal.fire({
            title: "Error!",
            text: "Failed to update user status.",
            icon: "error"
        });
    }
}

// Function to attach event listeners to block-user buttons
function attachBlockUserEventListeners() {
    document.querySelectorAll('.block-user').forEach(button => {
        button.addEventListener('click', async function () {
            let userId = this.getAttribute('data-id');
            let newStatus = await blockUser(userId, this);
            this.textContent = newStatus === 'blocked' ? 'Unblock' : 'Block';
        });
    });
}

// Ensure event listeners are attached initially
attachBlockUserEventListeners();

// toggle Menu
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


//logout funtion
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
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        }
    });
}

// JavaScript for the search bar functionality
document.getElementById('search-bar').addEventListener('keyup', function () {
    const query = this.value.trim(); // Get the search query from the input field

    // Send an AJAX request to the PHP script
    fetch(`../phpfile/searchUsers.php?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = ''; // Clear the table body

            // Populate the table with the search results
            if (data.length > 0) {
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.status}</td>
                        <td>${user.created_at}</td>
                        <td>
                            <button class="block-user" data-id="${user.id}" data-status="${user.status}">
                                ${user.status === 'blocked' ? 'Unblock' : 'Block'}
                            </button>
                        </td>
                    `;
                    userTable.appendChild(row);
                });

                // Re-attach event listeners to the new buttons
                attachBlockUserEventListeners();
            } else {
                // If no results, display a message
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="6" style="text-align: center;">No users found</td>
                `;
                userTable.appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
});

// Function to attach event listeners to block-user buttons
function attachBlockUserEventListeners() {
    document.querySelectorAll('.block-user').forEach(button => {
        button.addEventListener('click', async function () {
            let userId = this.getAttribute('data-id');
            let newStatus = await blockUser(userId, this);
            this.textContent = newStatus === 'blocked' ? 'Unblock' : 'Block';
        });
    });
}

// Ensure event listeners are attached initially
attachBlockUserEventListeners();    

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

document.getElementById('search-bar').addEventListener('keyup', function() {
    var searchValue = this.value.toLowerCase();
    console.log('Search Value:', searchValue); // Log search value
    fetch(`../phpfile/searchProducts.php?query=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data); // Log fetched data
            var tableBody = document.getElementById('productTable');
            tableBody.innerHTML = ''; // Clear the table

            if (data.length > 0) {
                // Populate the table with the search results
                data.forEach(product => {
                    var row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.product_id}</td>
                        <td>${product.product_name}</td>
                        <td>${product.product_description}</td>
                        <td>${product.product_price}</td>
                        <td>${product.product_sold}</td>
                        <td>
                            <img src="${product.product_imgUrl}" width="100" alt="Product Image">
                        </td>
                        <td>${product.product_stock}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                // Display "No products found" message
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="7" style="text-align: center;">No products found</td>
                `;
                tableBody.appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching products:', error));
});