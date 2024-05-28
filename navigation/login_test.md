---
layout: default
title: Login (Test)
search_exclude: true
permalink: /login-test/
---
<body class="light">
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
window.onload = (event) => {
      console.log("Page is fully loaded");
      let DarkMode = localStorage.getItem('DarkMode');
      DarkMode = (DarkMode === 'true'); // Convert to boolean
      console.log(DarkMode);
      if (DarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
};
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
            body: JSON.stringify(requestBody),
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        console.log(data);
                        document.cookie = "token=" + data.token + "; path=/";
                        window.location.replace("{{site.baseurl}}/dashboard/");
                    } else {
                        document.getElementById('message').innerHTML = "Invalid email or password"
                    }
                })
        }
    </script>
</body>
