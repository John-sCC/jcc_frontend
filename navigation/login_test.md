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
            fetch('https://jcc.stu.nighthawkcodingsociety.com/authenticate', {
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
                // No need to parse response body since it's setting a cookie in the headers
                // Handle the cookie in the headers instead
                const tokenCookie = response.headers.get('Set-Cookie');
                // Handle the cookie as needed
                console.log('Token cookie:', tokenCookie);
                // Optionally, you can return any relevant data from the backend
                return response.json();
            })
            .then(data => {
                // Optionally handle any JSON response from the backend
                console.log('Additional data from backend:', data);
                // Handle any further logic as needed
            })
            .catch(error => {
                // Handle errors, such as authentication failure
                console.log(error);
                // Display an error message to the user or handle the error in some way
            });
        }
    </script>
</body>