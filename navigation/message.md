---
layout: default
title: Message
permalink: /message/
---

<html lang="en">
<style>
    h1 {
        font-family: "Collegiate Inside", sans-serif;
        text-align: center;
        font-size: 35px;
        padding-top: 25px;
    }
    label {
        font-family: "Lexend", sans-serif;
        font-size: 20px;
        padding-left: 20px;
    }
    input {
        background-color: #D3D3D3;
        border: none;
        width: 95%;
        padding: 12px 20px;
        margin: 8px auto;
        box-sizing: border-box;
        border-radius: 25px;
        display: block;
    }
    textarea {
        background-color: #D3D3D3;
        border: none;
        width: 95%;
        padding: 12px 20px;
        margin: 8px auto;
        box-sizing: border-box;
        border-radius: 25px;
        border-color: green;
        display: block;
    }
    .box {
        border-radius: 2.5% 2.5%;
        background-color: #002147;
    }
    .submit {
        padding-bottom: 20px;
        color: red;
        font-size: 20px;
    }
    input[type="text"] {
        color: black;
    }
    input[type="submit"]:hover {
        background-color: #154734ff;
        color: white;
    }
</style>
<head>
    <title>Compose Message</title>
</head>
<body>
<div class="box">
    <h1>Compose New Message</h1>
    <form action="send_message.php" method="post">
        <label for="to">To:</label><br>
            <input type="text" id="to" name="to" placeholder="Username" required><br><br>
        <label for="subject">Subject:</label><br>
            <input type="text" id="subject" name="subject" placeholder="Subject" required><br><br>
        <label for="message">Message:</label><br>
            <textarea id="message" name="message" rows="5" required></textarea><br><br>
        <div class="submit"><input type="submit" value="Send Message"></div>
    </form>
</div>
</body>
</html>