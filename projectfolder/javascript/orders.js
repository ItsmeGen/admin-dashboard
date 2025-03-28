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
                    <td>${order.total_price}</td>
                    <td>${order.payment_method}</td>
                    <td>
                        <select class="status-dropdown" data-id="${order.id}">
                            <option value="Processing" ${order.order_status === 'Processing' ? 'selected' : ''}>Processing</option>
                            <option value="Shipped" ${order.order_status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="Out for Delivery" ${order.order_status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                            <option value="Delivered" ${order.order_status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="Cancelled" ${order.order_status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            <option value="Returned" ${order.order_status === 'Returned' ? 'selected' : ''}>Returned</option>
                            <option value="Completed" ${order.order_status === 'Completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </td>
                    <td>${order.created_at}</td>
                    <td>${order.tracking_number}</td>
                    <td>
                        <button class="delete-btn" data-id="${order.id}">Void</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            setupStatusDropdowns();
            setupDeleteButtons();
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    function setupStatusDropdowns() {
        document.querySelectorAll('.status-dropdown').forEach(dropdown => {
            dropdown.addEventListener('change', async function () {
                const orderId = this.getAttribute('data-id');
                const newStatus = this.value;

                try {
                    const response = await fetch('../phpfile/updateorderstatus.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: orderId, status: newStatus })
                    });
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const result = await response.json();

                    if (result.success) {
                        Toastify({
                            text: `Order #${orderId} status updated to ${newStatus}`,
                            duration: 3000,
                            gravity: "top",
                            position: "center",
                            backgroundColor: "green",
                        }).showToast();

                        if (result.tracking_number) {
                            Toastify({
                                text: `Tracking number: ${result.tracking_number}`,
                                duration: 5000,
                                gravity: "top",
                                position: "center",
                                backgroundColor: "blue",
                            }).showToast();
                        }
                    } else {
                        throw new Error(result.message || 'Failed to update status');
                    }
                } catch (error) {
                    console.error("Update Error:", error);
                    Toastify({
                        text: `Failed to update order: ${error.message}`,
                        duration: 3000,
                        gravity: "top",
                        position: "center",
                        backgroundColor: "red",
                    }).showToast();
                }
            });
        });
    }

    function setupDeleteButtons() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async function () {
                const orderId = this.getAttribute('data-id');
    
                // SweetAlert2 Confirmation
                Swal.fire({
                    title: `Are you sure you want to delete order #${orderId}?`,
                    text: "This action cannot be undone!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#254d32',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const response = await fetch('../phpfile/voidorder.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: orderId })
                            });
    
                            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                            const result = await response.json();
    
                            if (result.success) {
                                // Success message with SweetAlert
                                Swal.fire({
                                    title: 'Deleted!',
                                    text: `Order #${orderId} has been deleted.`,
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                                orderfetch();
                            } else {
                                throw new Error(result.message || 'Failed to delete order');
                            }
                        } catch (error) {
                            console.error("Delete Error:", error);
                            Swal.fire({
                                title: 'Error!',
                                text: `Failed to delete order: ${error.message}`,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    }
                });
            });
        });
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



