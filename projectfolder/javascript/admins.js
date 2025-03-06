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
if (confirm("Are you sure you want to logout?")) {
    try {
        let response = await fetch("../phpfile/logout.php", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        let data = await response.json();

        if (data.status === "success") {
            alert(data.message);
            window.location.href = "../views/userlogin.html"
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
}
}
