---
layout: default
title: Sign In 
permalink: /sign-in/
---

<style>
html {
    height: 100%;
  }
  
  body {
    height: 100%;
    margin: 0;
    font-family: "Collegiate Inside";
    display: grid;
    justify-items: center;
    align-items: center;
    background-color: #002147;
  }
  
  #main-holder {
    width: 50%;
    height: 70%;
    display: grid;
    justify-items: center;
    align-items: center;
    background-color: #154734;
    border-radius: 7px;
  }
  
  #login-header {
    color: #ffffff;
  }


  #login-error-msg-holder {
    width: 100%;
    height: 100%;
    font: "Collegiate Inside";
    display: grid;
    justify-items: center;
    align-items: center;
  }
  
  #login-error-msg {
    font: "Collegiate Inside";
    width: 23%;
    text-align: center;
    margin: 0;
    padding: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #8a0000;
    border: 1px solid #8a0000;
    background-color: #e58f8f;
    opacity: 0;
  }
  
  #error-msg-second-line {
    display: block;
  }
  
  #login-form {
    align-self: flex-start;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  
  .login-form-field {
    color: #3a3a3a;
  }
  
  .login-form-field {
    border: none;
    border-bottom: 1px solid #3a3a3a;
    margin-bottom: 10px;
    border-radius: 3px;
    outline: none;
    padding: 0px 0px 5px 5px;
  }
  
  #login-form-submit {
    width: 100%;
    padding: 7px;
    border: none;
    border-radius: 5px;
    color: white;
    font: "Collegiate Inside";
    font-weight: bold;
    background-color: #3a3a3a;
    cursor: pointer;
    outline: none;
  }


</style>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <script defer src="login-page.js"></script>
</head>

<body>
  <main id="main-holder">
    <h1 id="login-header" >Login</h1>
    <div id="login-error-msg-holder">
      <p id="login-error-msg">Invalid username <span id="error-msg-second-line">and/or password</span></p>
    </div>
    <form id="login-form">
      <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Username">
      <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
      <input type="submit" value="Login" id="login-form-submit">
    </form>
  </main>
</body>

</html>
