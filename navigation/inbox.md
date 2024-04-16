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
        body {
            font-family: Arial, sans-serif;
        }
        .message {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
        }
        .compose-btn {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Inbox</h1>
    <div class="message">
        <strong>From:</strong> John Doe<br>
        <strong>Subject:</strong> Meeting Reminder<br>
        <strong>Date:</strong> April 16, 2024<br>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et velit id justo rhoncus scelerisque. Donec vitae leo sit amet nunc maximus dictum.</p>
    </div>
    <div class="message">
        <strong>From:</strong> Jane Smith<br>
        <strong>Subject:</strong> Project Update<br>
        <strong>Date:</strong> April 15, 2024<br>
        <p>Hi everyone, just wanted to provide a quick update on our progress...</p>
    </div>
    <button class="compose-btn" onclick="window.location.hostname/jcc_frontend/message/">Compose New Message</button>
</body>
</html>
