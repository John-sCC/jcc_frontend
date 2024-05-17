---
layout: default
title: Message
permalink: /message/
---

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
        <label for="content">Content:</label>
        <textarea id="content" name="content" required></textarea>
    </div>
    <button type="submit">Send</button>
</form>

</body>
<script>
console.log(localStorage.getItem("email"))
    // Function to handle form submission
document.getElementById('composeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(this); // Get form data
    // Convert form data to JSON
    const message = {};
    formData.forEach((value, key) => {
        message[key] = value;
    });
    message["from"] = localStorage.getItem("email");
    //message["to"] = document.getElementById('username-field').value;;
    console.log(message);
    // Send message data to API
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
            // Clear form fields
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
</html>


<html lang="en">
<head>
  <title> JCC Emails</title>
</head>
<body>
  <header>
    <h1>Inbox</h1>
    <div class="search-bar">
      <input type="text" placeholder="Search">
    </div>
  </header>
  <nav>
    <ul>
      <li><a href="#">All</a></li>
      <li><a href="#">Important</a></li>
      <li><a href="#">Sent</a></li>
      <li><a href="#">Drafts</a></li>
    </ul>
  </nav>
  <main>
    <section class="emails">
      <ul>
        <li class="email">
          <div class="sender">
            <span class="name">Aiden Huynh, Christopher Jenkins</span>
            <span class="date">May 2, 2024</span>
          </div>
          <div class="subject">
            <a href="#">Stats Project - IMPORTANT!!!</a>
          </div>
          <div class="preview">
            <p>Drew Reed!!!</p>
          </div>
        </li>
        <li class="email">
          <div class="sender">
            <span class="name">Drew Reed</span>
            <span class="date">Apr 15, 2024</span>
          </div>
          <div class="subject">
            <a href="#">Welcome!</a>
          </div>
          <div class="preview">
            <p>Erm, what the sigma</p>
          </div>
        </li>
        </ul>
    </section>
  </main>
</body>
</html>