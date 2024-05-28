---
layout: default
title: Inbox
permalink: /inbox/
---
<body class="light">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Message Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .message {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
        }
        .compose-btn {
            background-color: #002147;
            color: white;
            padding: 10px 20px;
            border: 2px solid black;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 32px;
            border-color: #91976cff;
        }
    </style>
</head>
<body>
    <h1>Inbox</h1>
    <!--<a href="{{site.baseurl}}/message/"><button class="compose-btn">Compose</button></a>-->
    <div id="inbox-messages"></div>
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
        var local = "http://localhost:8911";
        var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
        fetch(deployed + '/api/messages')
            .then(response => response.json())
            .then(data => {
                // Loop through the received data and create HTML elements to display each message
                const messageList = document.getElementById('inbox-messages');
                data.forEach(message => {
                    const listItem = document.createElement('div');
                    listItem.classList.add('message');
                    listItem.innerHTML = `
                        <strong>ID:</strong> ${message.id}<br>
                        <strong>From:</strong> ${message.from}<br>
                        <strong>Subject:</strong> ${message.subject}<br>
                        <p>${message.content}</p>
                    `;
                    messageList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    </script>
</body>
</html>
