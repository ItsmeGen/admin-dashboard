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
                let currentStatus = this.getAttribute('data-status');
                let newStatus;
                
                if (currentStatus === 'blocked') {
                    newStatus = await unblockUser(userId, this);
                } else {
                    newStatus = await blockUser(userId, this);
                }
                
                if (newStatus) {
                    // Update button text and data attribute
                    this.textContent = newStatus === 'blocked' ? 'Unblock' : 'Block';
                    this.setAttribute('data-status', newStatus);
                    
                    // Also update the status cell in the table
                    const statusCell = this.closest('tr').querySelector('td:nth-child(4)');
                    if (statusCell) {
                        statusCell.textContent = newStatus;
                    }
                }
            });
        });
    }
});

// Move userFetch to the global scope
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
    attachBlockUserEventListeners();
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    // Call userFetch to load initial data
    userFetch();
});

// Define blockUser and unblockUser in the global scope
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
        body: JSON.stringify({ id: userId, action: 'block' })
    });

    const result = await response.json();

    if (result.success) {
        Swal.fire({
            title: "Success!",
            text: `User has been ${result.new_status === 'blocked' ? 'blocked' : 'unblocked'}.`,
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

async function unblockUser(userId, button) {
    const confirmAction = await Swal.fire({
        title: "Are you sure?",
        text: "You want to unblock this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#254d32",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Unblock it!"
    });

    if (!confirmAction.isConfirmed) {
        return;
    }

    const response = await fetch('../phpfile/blockUser.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, action: 'unblock' })
    });

    const result = await response.json();

    if (result.success) {
        Swal.fire({
            title: "Success!",
            text: `User has been ${result.new_status === 'active' ? 'unblocked' : 'blocked'}.`,
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

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    // Other code...

    // Call userFetch to load initial data
    userFetch();
});

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
            let currentStatus = this.getAttribute('data-status');
            let newStatus;

            if (currentStatus === 'blocked') {
                newStatus = await unblockUser(userId, this);
            } else {
                newStatus = await blockUser(userId, this);
            }

            if (newStatus) {
                // Update button text and data attribute
                this.textContent = newStatus === 'blocked' ? 'Unblock' : 'Block';
                this.setAttribute('data-status', newStatus);

                // Also update the status cell in the table
                const statusCell = this.closest('tr').querySelector('td:nth-child(4)');
                if (statusCell) {
                    statusCell.textContent = newStatus;
                }
            }
        });
    });
}    
