 // Load existing registered users from local storage on page load
 document.addEventListener("DOMContentLoaded", function() {
    loadRegisteredUsers();
});

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Input validation
    const errorMessages = [];
    if (!firstName.trim()) {
        errorMessages.push("First Name is required.");
    }
    if (!lastName.trim()) {
        errorMessages.push("Last Name is required.");
    }
    if (!email.trim()) {
        errorMessages.push("Email is required.");
    } else if (!isValidEmail(email)) {
        errorMessages.push("Please enter a valid email address.");
    }
    if (!phone.trim()) {
        errorMessages.push("Phone Number is required.");
    } else if (!isValidPhone(phone)) {
        errorMessages.push("Please enter a valid phone number.");
    }

    // Display error messages, if any
    const messageContainer = document.getElementById("messages");
    messageContainer.innerHTML = "";
    if (errorMessages.length > 0) {
        errorMessages.forEach(message => {
            const errorDiv = document.createElement("div");
            errorDiv.textContent = message;
            errorDiv.classList.add("message");
            messageContainer.appendChild(errorDiv);
        });
    } else {
        // Create a new row in the table for the registered user
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${phone}</td>
        `;

        // Append the new row to the table
        document.getElementById("registeredUsersTableBody").appendChild(newRow);

        // Clear the form inputs for new inputs
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";

        // Save registered user data to local storage
        saveRegisteredUser({ firstName, lastName, email, phone });

        // Display success message
        const successDiv = document.createElement("div");
        successDiv.textContent = "Registration successful!";
        successDiv.classList.add("message", "success");
        messageContainer.appendChild(successDiv);
    }
});

// Helper functions for input validation
// ... (previously defined isValidEmail and isValidPhone functions) ...
function isValidEmail(email) {
    // Simple email validation regex (you can use a more comprehensive one)
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Simple phone number validation (you can use a more comprehensive one)
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// Function to save registered user data to local storage
function saveRegisteredUser(userData) {
    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    registeredUsers.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}

// Function to load existing registered users from local storage
function loadRegisteredUsers() {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const tableBody = document.getElementById("registeredUsersTableBody");
    tableBody.innerHTML = "";
    registeredUsers.forEach(user => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        `;
        tableBody.appendChild(newRow);
    });
}