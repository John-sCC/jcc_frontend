---
layout: default
title: Message
permalink: /message/
---
<body class="light">
<html lang="en">
<style>
    input {
        background-color: #D3D3D3;
        border: none;
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border-radius: 25px;
    }
    textarea {
        background-color: #D3D3D3;
        border: none;
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border-radius: 25px;
    }

</style>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compose Message</title>
</head>
<body>
    <h1>Compose New Message</h1>
    <form action="send_message.php" method="post">
        <label for="to">To:</label><br>
            <input type="text" id="to" name="to" placeholder="Username" required><br><br>
        <label for="subject">Subject:</label><br>
            <input type="text" id="subject" name="subject" placeholder="Subject" required><br><br>
        <label for="message">Message:</label><br>
            <textarea id="message" name="message" rows="5" required></textarea><br><br>
        <input type="submit" value="Send Message">
    </form>
</body>
<script>
  function themeChange() {
            const DarkMode = JSON.parse(localStorage.getItem('DarkMode')) || false;
            const newDarkMode = !DarkMode;
            if (DarkMode) {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.add('light');
                document.body.classList.remove('dark');
            }
            localStorage.setItem('DarkMode', JSON.stringify(newDarkMode));
  }
</script>
</html>
