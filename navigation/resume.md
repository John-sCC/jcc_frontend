---
layout: default
title: Resume
permalink: /resume/
---

<style>
    .wrapper-div {
        width: 80%;
        height: 80%;
        background-color: rgba(255, 255, 255, 0);
        border: 2px solid #c1b576;
        padding: 30px;
        padding-top: 10px;
        padding-left: 10%;
    }

    .formStyle {
        font-size: 13px;
        margin-bottom: 30px;
    }

    .title {
        font-size: 30px;
        margin-bottom: 40px;
    }

</style>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="wrapper-div">
    <div class="title"> Personal Information </div>
        <form id="personalDetails" class="formStyle">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" name="first-name" required><br><br>
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" name="last-name" required><br><br>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <label for="address">Address:</label>
            <input type="text" id="address" name="address" required><br><br>
            <!-- -->
        </form>
        <button type="button" onclick="save()">Save Info</button>
        <button type="button" onclick="seeResume()">See The Resume</button>
    </div>
</body>
<script>
        function save() {
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            // 
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('phone', phone);
            localStorage.setItem('email', email);
            localStorage.setItem('address', address);
        }
        function seeResume() {
            window.open('/jcc_frontend/filledresume/', '_blank');
        }
    </script>
</html>
