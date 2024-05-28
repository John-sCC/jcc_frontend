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
        .body {
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
            border-radius: 25px;
        }
        .body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        .container {
            display: flex;
            flex: 1;
            gap: 30px; 
        }
        .sidebar {
            width: 30%;
            background-color: #002147ff;
            overflow-y: auto;
            border-radius: 25px;
        }
        .body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        .container {
            display: flex;
            flex: 1;
            gap: 30px; 
            margin-bottom: 10vw;
        }
        .sidebar {
            width: 30%;
            background-color: #002147ff;
            overflow-y: auto;
            border-radius: 25px;
        }
        .main-content {
            width: 70%;
            padding: 20px;
            overflow-y: auto;
            background-color: #eaeaea;
            border-radius: 25px;
        }
        .email-item {
            padding: 15px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }
        .email-item:hover {
            background-color: #eaeaea;
        }
        .email-content {
            padding: 20px;
            background-color: #eaeaea;
            color: #002147ff;
        }
        .hr
        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
            .sidebar, .main-content {
                width: 100%;
            }
        }

    </style>
</head>
<div class="body">
    <h1>Inbox</h1>
    <a href="{{site.baseurl}}/message/"><button class="compose-btn">Compose</button></a>
    <div class="container">
        <div class="sidebar" id="message-list">
            <!-- Add more email items here -->
        </div>
        <div class="main-content">
            <div class="email-content" id="message-content">
                <h2>Email Subject</h2>
                <p>From: Sender Name</p>
                <p>Date: Date and Time</p>
                <hr>
                <p>Email body content goes here...</p>
            </div>
        </div>
    </div>
    <div id="inbox-messages"></div>
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
        var local = "http://localhost:8911";
        var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
        fetch(deployed + '/api/messages')
        .then(response => response.json())
        .then(data => {
            // Loop through the received data and create HTML elements to display each message
            const messageContent = document.getElementById('message-content');
            const messageList = document.getElementById('message-list');
            data.forEach(message => {
                if(message.to == localStorage.getItem("email")){
                    const listItem = document.createElement('div');
                    listItem.classList.add('email-item');
                    listItem.innerHTML = `
                        <strong>To:</strong> ${message.to}<br>
                        <strong>From:</strong> ${message.from}<br>
                        <strong>Subject:</strong> ${message.subject}<br>
                    `;
                    messageList.appendChild(listItem);
                    listItem.addEventListener('click', () => {
                    messageContent.innerHTML = `
                        <div class="email-content">
                            <h2>${message.subject}</h2>
                            <p>To: ${message.to}</p>
                            <p>From: ${message.from}</p>
                            <hr>
                            <p>${message.content}</p>
                        </div>
                    `;
                });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    </script>
</div>
</html>
