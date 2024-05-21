---
layout: default
title: Inbox
permalink: /inbox/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Message Page</title>
    <style>
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
        body {
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
<body>
    <h1>Inbox</h1>
    <a href="{{site.baseurl}}/message/"><button class="compose-btn">Compose</button></a>
    <div class="container">
        <div class="sidebar">
            <!-- <div class="email-item">
                <h4>Subject: Meeting Reminder</h4>
                <p>From: John Doe</p>
                <p>Snippet of the email...</p>
            </div>
            <div class="email-item">
                <h4>Subject: Project Update</h4>
                <p>From: Jane Smith</p>
                <p>Snippet of the email...</p>
            </div> -->
            <!-- Add more email items here -->
        </div>
        <div class="main-content">
            <div class="email-content">
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
        var local = "http://localhost:8911";
        var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
        fetch(local + '/api/messages')
        .then(response => response.json())
        .then(data => {
            // Loop through the received data and create HTML elements to display each message
            const messageList = document.getElementById('sidebar');
            data.forEach(message => {
                if(message.to == localStorage.getItem("email")){
                    const listItem = document.createElement('div');
                    listItem.classList.add('email-item');
                    listItem.innerHTML = `
                        <strong>ID:</strong> ${message.id}<br>
                        <strong>To:</strong> ${message.to}<br>
                        <strong>From:</strong> ${message.from}<br>
                        <strong>Subject:</strong> ${message.subject}<br>
                        <p>${message.content}</p>
                    `;
                    messageList.appendChild(listItem);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    </script>
</body>
</html>
