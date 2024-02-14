---
layout: default
title: Sign-In
permalink: /sign-in/
---

<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">

<style>
    html,
    body {
      height: 100%;
      margin: 0;
      font-family: "Lexend", sans-serif;
      background-color: #154734;
    }

    #main-holder {
      height: 100%;
      display: grid;
      grid-template-columns: minmax(150px, 1fr) 2fr;
      align-items: center;
    }

    #brand-logo {
      display: flex;
      justify-content: center;
      align-items: right;
      margin-left: 30px;
      grid-column: 1 / span 1; /* logo in first column */
    }

    #brand-logo img {
      max-width: 70%;
      max-height: 70%;
    }

    #login-div {
      background-color: #002147; 
      width: 60%;
      border: 4px solid #91976C;
      padding: 20px;
      margin: 50px; 
      margin-left: 150px;
      border-radius: 10px; 
      grid-column: 2 / span 1; /* sign-in div in second solumn */
    }

    #login-header {
      color: #ffffff;
      font-family: "Lexend", sans-serif;
      font-size: 35pt;
      margin-top: 50px;
      margin-bottom: 10px;
      margin-left: 20%; /* Set margin-left to 20% */
      width: 60%; /* Set width to 60% */
    }


    #login-subheader,
    #forgot-password,
    #no-account,
    #create-account {
      color: #ffffff;
      margin-left: 20%; /* Set margin-left to 20% */
      width: 80%; /* Set width to 60% */
    }
    
    #login-subheader {
        font-size: 12px;
        margin-bottom: 50px;
    }
    #create-account {
      margin-bottom: 100px;
      }

    #login-form {
      width: 100%;
      display: grid;
      grid-gap: 10px;
      margin-bottom: 20px;
    }

    #forgot-password {
      font-family: "Lexend", sans-serif;
        font-size: 15px;
        margin-bottom: 15px;
        color: #22956b;
    }

    .login-form-field {
      width: calc(70% - 10px);
      color: #3a3a3a;
      border: none;
      border-bottom: 1px solid #3a3a3a;
      border-radius: 3px;
      outline: none;
      padding: 5px;
      margin-left: 20%; 
      width: 60%; 
    }

    #login-form-submit {
      width: 100%;
      padding: 7px;
      border: none;
      border-radius: 15px;
      color: white;
      font-weight: bold;
      background-color: #154734ff;
      margin-bottom: 20px;
      cursor: pointer;
      outline: none;
      margin-left: 20%; 
      width: 60%; 
    }

    #no-account {
      font-family: "Lexend", sans-serif;
        font-size: 15px;
        margin-bottom: 5px;
    }

    #create-account {
      font-family: "Lexend", sans-serif;
        font-size: 15px;
        margin-bottom: 60px;
        color: #22956b;
    }

  </style>

</head>

<body>
  <main id="main-holder">
    <div id="brand-logo">
      <img src="../images/icons/dnhs_logo.png" alt="Brand Logo">
    </div>
    <div id="login-div">
      <h1 id="login-header">Sign-in</h1>
      <div id="login-subheader">If you already have an account.</div>
      <form id="login-form">
        <input type="text" name="username" id="username-field" class="login-form-field" placeholder="email">
        <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
      </form>
      <div id="forgot-password">Forgot Password?</div>
      <input type="submit" value="Sign In" id="login-form-submit" onclick="signIn()">
      <div id="no-account">No account?</div>
      <div id="create-account">Click here to make one!</div>
    </div>
  </main>
</body>

</html>

<script>
  function signIn() {

    console.log("button clicked");
    var email = document.getElementById('username-field').value;
    var password = document.getElementById('password-field').value;

    var requestBody = {
        email: email,
        password: password
    };
   
    fetch('https://jcc.stu.nighthawkcodingsociety.com/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // if (data.status == 200) {
            console.log(data);
            document.cookie = "jwt=" + data.token + "; path=/";
            window.location.replace("{{site.baseurl}}/dashboard/");
        // } else {
        //     console.log("Invalid email or password"); 
        // }
    })
    .catch(error => {
        console.error('There was an error!', error);

        console.log("Error occurred during sign-in");  
    });
    
    /*
    document.getElementById('login-form-submit').onclick = function () {
      signIn();
    };
    */
}

</script>
