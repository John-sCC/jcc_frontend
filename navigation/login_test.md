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
            fetch('http://localhost:8911/authenticate', {//'https://jcc.stu.nighthawkcodingsociety.com/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            })
            .then((data) => {
                if (data.status == 200) {
                        window.location.replace("{{site.baseurl}}/user-disp-test/");
                    } else {
                        document.getElementById('message').innerHTML = "Invalid email or password"
                    }
                })
        }
    </script>
</body>