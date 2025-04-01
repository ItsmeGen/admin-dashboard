document.addEventListener("DOMContentLoaded", function () {
    const addEmployeeModal = document.getElementById("addEmployeeModal");
    const editEmployeeModal = document.getElementById("editEmployeeModal");
    const addProductBtn = document.getElementById("addProductBtn");
    const closeAddEmpModal = document.querySelector(".add-close");
    const editEmployeeForm = document.getElementById("editEmployeeForm");
    const addEmployeeForm = document.getElementById("addEmployeeForm");

    console.log("DOM fully loaded");

    // Open Add Employee Modal
    addProductBtn.addEventListener("click", function() {
        addEmployeeModal.style.display = "flex";
    });

    // Close Add Employee Modal
    if (closeAddEmpModal) {
        closeAddEmpModal.addEventListener("click", function() {
            addEmployeeModal.style.display = "none";
        });
    }

    window.onclick = function(event) {
        if (event.target === addEmployeeModal) addEmployeeModal.style.display = "none";
        if (event.target === editEmployeeModal) editEmployeeModal.style.display = "none";
    };
    
    // PHP TOASTIFY NOTIFICATIONS
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
    fetchEmployee();

    //ADD EMPLOYEE FORM SUBMISSION
    addEmployeeForm.addEventListener("submit", async function (event) {
        event.preventDefault();

    
        const name = document.getElementById("addEmployeeName").value.trim();
        const contact = document.getElementById("addContactNumber").value.trim();
        const username = document.getElementById("addUsername").value.trim();
        const password = document.getElementById("addPassword").value.trim();
        const role = document.getElementById("addRole").value.trim();

        if (!name || !contact || !username || !password || !role) {
            Swal.fire("Error!", "Please fill in all fields.", "error");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("contact", contact);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("role", role);

        try {
            const response = await fetch("../phpfile/addEmployee.php", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.status === "success") {
                Swal.fire("Success!", data.message, "success");
                document.getElementById("addEmployeeModal").style.display = "none";
                addEmployeeForm.reset(); 
                fetchEmployee(); 
            } else {
                Swal.fire("Error!", data.message, "error");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            Swal.fire("Error!", "Failed to add employee. Try again later.", "error");
        }
    });

    //EDIT EMPLOYEE FORM SUBMISSION
    editEmployeeForm.addEventListener("submit", async function (event) {
        event.preventDefault(); 

    
        const employeeId = document.getElementById("editEmployeeId").value;
        const name = document.getElementById("editEmployeeName").value.trim();
        const contact = document.getElementById("editEmployeeContact").value.trim();
        const username = document.getElementById("editEmployeeUsername").value.trim();
        const password = document.getElementById("editEmployeePassword").value.trim();
        const role = document.getElementById("editEmployeeRole").value;

        if (!name || !contact || !username || !password || !role) {
            Swal.fire("Error!", "Please fill in all fields.", "error");
            return;
        }

        const formData = new FormData();
        formData.append("employee_id", employeeId);
        formData.append("name", name);
        formData.append("contact", contact);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("role", role);

        try {
            const response = await fetch("../phpfile/editEmployee.php", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.status === "success") {
                Swal.fire("Updated!", data.message, "success");
                document.getElementById("editEmployeeModal").style.display = "none"; // Close modal
                fetchEmployee();
            } else {
                Swal.fire("Error!", data.message, "error");
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            Swal.fire("Error!", "Failed to update employee. Try again later.", "error");
        }
    });
});

//FETCH EMPLOYEES FUNCTION
async function fetchEmployee() {
    let table = document.getElementById('table');
    table.innerHTML = ''; 

    try {
        const response = await fetch("../phpfile/employeeFetch.php", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const results = await response.json();

        results.forEach((result) => {
            let newRow = document.createElement('tr'); 

            newRow.innerHTML = `
                <td>${result.employee_id}</td>
                <td>${result.employee_name}</td>
                <td>${result.contact_number}</td>
                <td>${result.username}</td>
                <td>${result.password}</td>
                <td>${result.role}</td>
                <td>
                    <button class="edit-btn"
                        data-id="${result.employee_id}"
                        data-name="${result.employee_name}"
                        data-contact="${result.contact_number}"
                        data-username="${result.username}"
                        data-password="${result.password}"
                        data-role="${result.role}">
                        Edit
                    </button>
                    <button class="delete-btn" data-id="${result.employee_id}">Delete</button>
                </td>
            `;

            table.appendChild(newRow); 
        });

    } catch (error) {
        console.error("Error fetching employee data:", error);
    }
}

//EVENT DELEGATION FOR EDIT & DELETE BUTTONS
document.getElementById("table").addEventListener("click", function(event) {
    if (event.target.classList.contains("edit-btn")) {
        let button = event.target;
        openEditModal(
            button.dataset.id, 
            button.dataset.name, 
            button.dataset.contact,
            button.dataset.username, 
            button.dataset.password, 
            button.dataset.role
        );
    }

    if (event.target.classList.contains("delete-btn")) {
        let employeeId = event.target.dataset.id;
        deleteEmployee(employeeId);
    }
});

//OPEN EDIT MODAL FUNCTION
function openEditModal(employeeId, name, contact, username, password, role) {
    document.getElementById("editEmployeeId").value = employeeId;
    document.getElementById("editEmployeeName").value = name;
    document.getElementById("editEmployeeContact").value = contact;
    document.getElementById("editEmployeeUsername").value = username;
    document.getElementById("editEmployeePassword").value = password;
    document.getElementById("editEmployeeRole").value = role;

    document.getElementById("editEmployeeModal").style.display = "flex";
}

// DELETE EMPLOYEE FUNCTION
async function deleteEmployee(employeeId) {
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#254d32",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`../phpfile/deleteEmployee.php?id=${employeeId}`, {
                    method: "DELETE"
                });

                const data = await response.json();
                if (data.status === "success") {
                    Swal.fire("Deleted!", data.message, "success");
                    fetchEmployee(); // Refresh table
                } else {
                    Swal.fire("Error!", data.message, "error");
                }
            } catch (error) {
                console.error("Error deleting employee:", error);
                Swal.fire("Error!", "Failed to delete. Try again later.", "error");
            }
        }
    });
}

//TOGGLE MENU FUNCTIONALITY
function toggleMenu() {
    var subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
    document.body.classList.toggle("menu-open");
}

document.addEventListener("click", function(event) {
    var subMenu = document.getElementById("subMenu");
    var profilePic = document.querySelector(".profile-pic");
    if (!subMenu.contains(event.target) && !profilePic.contains(event.target)) {
        subMenu.classList.remove("open-menu");
        document.body.classList.remove("menu-open");
    }
});

//LOGOUT FUNCTION
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
                    Swal.fire("Logged Out!", data.message, "success");
                    setTimeout(() => {
                        window.location.href = "../views/userlogin.html";
                    }, 1000); 
                }
            } catch (error) {
                console.error("Logout failed:", error);
                Swal.fire("Error!", "Logout failed. Please try again.", "error");
            }
        }
    });
}

document.getElementById('search-bar').addEventListener('keyup', function () {
    const query = this.value.trim(); // Trim whitespace

    fetch(`../phpfile/searchEmployee.php?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const table = document.getElementById('table');
            table.innerHTML = ''; // Clear existing rows

            if (data.length === 0) {
                // If no results, show a message
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = `<td colspan="7" style="text-align: center;">No employees found</td>`;
                table.appendChild(noDataRow);
                return;
            }

            data.forEach(result => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${result.employee_id}</td>
                    <td>${result.employee_name}</td>
                    <td>${result.contact_number}</td>
                    <td>${result.username}</td>
                    <td>${result.password}</td>
                    <td>${result.role}</td>
                    <td>
                        <button class="edit-btn"
                            data-id="${result.employee_id}"
                            data-name="${result.employee_name}"
                            data-contact="${result.contact_number}"
                            data-username="${result.username}"
                            data-password="${result.password}"
                            data-role="${result.role}">
                            Edit
                        </button>
                        <button class="delete-btn" data-id="${result.employee_id}">Delete</button>
                    </td>
                `;
                table.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            const table = document.getElementById('table');
            table.innerHTML = `<tr><td colspan="7" style="text-align: center;">Error loading data</td></tr>`;
        });
});