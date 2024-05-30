---
layout: default
title: Message
permalink: /message/
---
<body class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compose Message</title>
    <style>
        .body {
            height: 100%;
            margin: 0;
            /*background-color: #f0f0f0;*/
            font-family: "Collegiate Inside";
        }
        h1 {
            text-align: center;
            padding-top: 20px;
            font-family: "Collegiate Inside";
        }
        label {
            color: white;
            display: block;
            margin-bottom: 5px;
        }
        input, textarea {
            background-color: #D3D3D3;
            border: none;
            width: calc(100% - 40px);
            padding: 12px 20px;
            margin: 8px 0;
            box-sizing: border-box;
            border-radius: 25px;
        }
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
        }
        .content {
            width: 80%;
            background-color: #002147ff;
            padding: 20px;
            border-radius: 25px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
        }
        button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 25px;
            background-color: #154734ff;
            color: white;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background-color: #22956b;
        }
    </style>
</head>
<body class="light">
<div class="body">
    <div class="container">
        <div class="content">
            <h1>Compose New Message</h1>
            <form id="composeForm">
                <div>
                    <label for="to">To:</label>
                    <input type="text" id="to" name="to" required>
                </div>
                <div>
                    <label for="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div>
                    <label for="content">Message:</label>
                    <textarea id="content" name="content" rows="4" required></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
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
        console.log(localStorage.getItem("email"))
        document.getElementById('composeForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const message = {};
            formData.forEach((value, key) => {
                message[key] = value;
            });
            message["from"] = localStorage.getItem("email");
            console.log(message);
            fetch(deployed + '/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    this.reset();
                } else {
                    throw new Error('Failed to send message.');
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again later.');
            });
        });
    </script>
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
</script>
