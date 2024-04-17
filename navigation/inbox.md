---
layout: default
title: Inbox
permalink: /inbox/
---

<!DOCTYPE html>
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
            text-decoration: none;
            display: inline-block;
        }
    </style>
</head>
<body>
    <h1>Inbox</h1>
    <div id="inbox-messages"></div>
    <script>
        // Sample array of messages
        var messages = [
            {
                from: "John Doe",
                subject: "Meeting Reminder",
                date: 17,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et velit id justo rhoncus scelerisque. Donec vitae leo sit amet nunc maximus dictum.",
                id:1
            },
            {
                from: "Jane Smith",
                subject: "Project Update",
                date: 15,
                content: "Hi everyone, just wanted to provide a quick update on our progress...",
                id: 0
            }
            // Add more messages as needed
        ];
        function get_message() {
                var requestBody = {
                    from: from,
                    subject: subject,
                    date: date,
                    content: content,
                    id: id
                };
            var requestOptions = {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                body: JSON.stringify(requestBody),
                headers: {
                    "content-type": "application/json",
                },
            };
            fetch(deployed + '/message', requestOptions)
            .then(response => response.text()) // Get response text
            .then(data => {
                // Check response status
                console.log(data);
                if (data.includes("message received")) { // Assuming this string indicates successful authentication
                    messages.add(null)
                    return;
                } else {
                    displayErrorMessage("message not received");
                }
            })
            .catch(error => {
                console.error('There was an error:', error);
                // Error occurred during sign-in
                displayErrorMessage(error.message);
            });
        }
    function displayErrorMessage(message) {
      // check if error message already exists 
      var existingErrorMessage = document.querySelector('.error-message');
      if (!existingErrorMessage) {
        var errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.getElementById('login-div').appendChild(errorDiv);
      }
    }
        // Function to generate message HTML
        function generateMessageHTML(message) {
            return `
                <div class="message">
                    <strong>From:</strong> ${message.from}<br>
                    <strong>Subject:</strong> ${message.subject}<br>
                    <strong>Date:</strong> "April ${message.date}, 2024"<br>
                    <p>${message.content}</p>
                </div>
            `;
        }
        // Function to render messages
        function renderMessages() {
            var inboxContainer = document.getElementById("inbox-messages");
            var messagesHTML = "";
            messages.forEach(function(message) {
                messagesHTML += generateMessageHTML(message);
            });
            inboxContainer.innerHTML = messagesHTML;
        }
        // Call renderMessages function to display messages
        renderMessages();
    </script>
    <a href="compose.html" class="compose-btn">Compose New Message</a>
</body>
</html>
