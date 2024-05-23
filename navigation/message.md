---
layout: default
title: Message
permalink: /message/
---
<head>
  <title>Compose Message</title>
  <style>
      @import url("https://fonts.googleapis.com/css?family=Raleway:900&display=swap");
      body, html {
          height: 100%;
          margin: 0;
          background-color: #f0f0f0;
          font-family: Raleway, sans-serif;
      }
      h1 {
          text-align: center;
          padding-top: 20px;
          font-family: 'Nighthawk', Raleway, sans-serif; /* Change to Nighthawk Font */
      }
      label {
          color: red;
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
      .content {
          width: 300px;
          height: 300px;
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
      }
      button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 25px;
          background-color: #4CAF50;
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
      }
      button:hover {
          background-color: #45a049;
      }
  </style>
</head>
<body>
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
    <script>
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
            fetch('http://localhost:8911/api/messages', {
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
</body>
</html>
