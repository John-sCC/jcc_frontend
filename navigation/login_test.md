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
            fetch('http://localhost:8911/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody) // Add this line to include the request body
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const tokenCookie = response.headers.get('Set-Cookie');
                // Handle the cookie as needed
                console.log('Token cookie:', tokenCookie);
                // Optionally, you can return any relevant data from the backend
                return response.json();
            })
            .then(data => {
                console.log('Additional data from backend:', data);
            })
            .catch(error => {
                console.log('Authentication error:', error.message);
            });
        }
    </script>
</body>
