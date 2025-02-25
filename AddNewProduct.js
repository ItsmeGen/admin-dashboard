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


    // Open Add Product Modal
    addProductBtn.addEventListener("click", () => {
        addProductForm.reset();
        addProductModal.style.display = "flex";
    });

    // Close Add Product Modal
    closeAddModal.addEventListener("click", () => {
        addProductModal.style.display = "none";
    });

    // Close Edit Product Modal
    if (closeEditModal) {
        closeEditModal.addEventListener("click", () => {
            editProductModal.style.display = "none";
        });
    }

    fetchProducts();

    async function fetchProducts() {
        try {
            console.log("Fetching products...");
            const response = await fetch("productFetch.php");
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
                        <td>
                            <button class="edit-btn" 
                                data-id="${product.product_id}" 
                                data-name="${product.product_name}"
                                data-description="${product.product_description}"
                                data-price="${product.product_price}"
                                data-sold="${product.product_sold}"
                                data-image="${product.product_imgUrl}"
                                data-stock="${product.product_stock}">
                                Edit
                            </button>
                            <button class="delete-btn" data-id="${product.product_id}">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    document.addEventListener("click", function (event) {
        if (event.target.matches(".edit-btn")) {
            const productId = event.target.dataset.id;
            const name = event.target.dataset.name;
            const description = event.target.dataset.description;
            const price = event.target.dataset.price;
            const sold = event.target.dataset.sold;
            const imageUrl = event.target.dataset.image;
            const stock = event.target.dataset.stock;
            openEditModal(productId, name, description, price, sold, imageUrl, stock);
        }

        if (event.target.matches(".delete-btn")) {
            const productId = event.target.dataset.id;
            deleteProduct(productId);
        }
    });

    // Open Edit Product Modal
    function openEditModal(productId, name, description, price, sold, imageUrl, stock) {
        console.log("Opening edit modal for product ID:", productId);

        document.getElementById("editProductId").value = productId;
        document.getElementById("editProductName").value = name;
        document.getElementById("editProductDescription").value = description;
        document.getElementById("editProductPrice").value = price;
        document.getElementById("editProductSold").value = sold;
        document.getElementById("editProductImageUrl").value = imageUrl;
        document.getElementById("editProductStock").value = stock;

        editProductModal.style.display = "flex";
    }

    async function deleteProduct(productId) {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                console.log("Deleting product ID:", productId);
                const response = await fetch("deleteProduct.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ product_id: productId }),
                });

                const data = await response.json();
                console.log("Delete response:", data);

                if (data.status === "success") {
                    Toastify({
                        text: "Deleted Successfully!",
                        duration: 3000,
                        gravity: "top",
                        position: "left",
                        backgroundColor: "green",
                    }).showToast();
                    fetchProducts(); // Refresh table
                } else {
                    Toastify({
                        text: "Failed to Delete",
                        duration: 3000,
                        gravity: "top",
                        position: "left",
                        backgroundColor: "green",
                    }).showToast();
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    // Update Product Function
    editProductForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(editProductForm);

        try {
            const response = await fetch("editProduct.php", {
                method: "POST",
                body: formData,
            });

            const data = await response.text();
            console.log("Update response:", data);
            Toastify({
                text: "Product Updated Successfully!",
                duration: 3000,
                gravity: "top",
                position: "left",
                backgroundColor: "green",
            }).showToast();
            editProductModal.style.display = "none";
            fetchProducts();
        } catch (error) {
            console.error("Error:", error);
        }
    });

    // Add Product Function
    addProductForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(addProductForm);

        try {
            const response = await fetch("addProduct.php", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Add response:", data);

            if (data.status === "success") {
                Toastify({
                    text: "Product Added Successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "left",
                    backgroundColor: "green",
                }).showToast();
                addProductModal.style.display = "none";
                fetchProducts();
            } else {
                Toastify({
                    text: "Add Failed! " + data.message,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                }).showToast();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
