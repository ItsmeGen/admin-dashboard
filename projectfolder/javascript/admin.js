document.addEventListener("DOMContentLoaded", function () {
    const addProductModal = document.getElementById("productModal");
    const editProductModal = document.getElementById("editProductModal");
    const addProductBtn = document.getElementById("addProductBtn");
    const closeAddModal = document.querySelector(".close");
    const closeEditModal = document.querySelector(".edit-close");
    const editProductForm = document.getElementById("editProductForm");
    const addProductForm = document.getElementById("productForm");

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

    async function fetchProducts() {
        try {
            console.log("Fetching products...");
            const response = await fetch("../phpfile/productFetch.php");
            const data = await response.json();
            console.log("Products received:", data);

            let tableBody = document.getElementById("productTable");
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
        confirmButtonColor: "#3085d6",
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

