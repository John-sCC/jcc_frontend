---
layout: default
title: Login (Test)
search_exclude: true
permalink: /login-test/
---

<body>
    <h2>Login</h2>
    <form id="loginForm">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="button" onclick="signIn()">Sign In</button>
    </form>
    <script>
        function signIn() {
            // Get values from input fields
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            // Create JSON body
            var requestBody = {
                email: email,
                password: password
            };
            // Make the fetch request
        fetch('https://jcc.stu.nighthawkcodingsociety.com/authenticate', {//'http://localhost:8911/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Assuming the response is in JSON format
        })
        .then(data => {
            // Handle the authentication success
            console.log('Authentication successful:', data);
            // Now you can use the data as needed
            // For example, redirect to a new page or update the UI
        })
        .catch(error => {
            // Handle errors, such as authentication failure
            console.error('Authentication error:', error.message);
            // Display an error message to the user or handle the error in some way
        });
    }
    </script>
</body>