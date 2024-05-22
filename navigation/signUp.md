---
layout: default
title: Sign-Up
permalink: /sign-up/
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up</title>
  <link rel="stylesheet" href="{{site.baseurl}}/signIn.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
  <style>
    .tags-input-container {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #ddd;
      padding: 5px;
      border-radius: 3px;
      cursor: text;
    }

    .tags-input-container input {
      border: none;
      outline: none;
      flex: 1;
      padding: 5px;
    }

    .tag {
      background-color: #007BFF;
      color: white;
      padding: 5px 10px;
      margin: 2px;
      border-radius: 3px;
      display: flex;
      align-items: center;
    }

    .tag .remove-tag {
      margin-left: 10px;
      cursor: pointer;
    }

    .suggestions-container {
      position: absolute;
      z-index: 1000;
      width: 100%;
      background-color: #fff;
      border: 1px solid #ddd;
    }

    .suggestion {
      padding: 8px;
      color: black; /* Set the text color to black */
      cursor: pointer;
    }

    .suggestion:hover {
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>
  <main id="main-holder">
    <div id="brand-logo">
      <img src="../images/icons/dnhs_logo.png" alt="Brand Logo">
    </div>
    <div id="login-div">
      <h1 id="login-header">Sign-Up</h1>
      <form id="login-form">
        <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Email">
        <input type="text" name="firstname" id="firstname-field" class="login-form-field" placeholder="First Name">
        <input type="text" name="lastname" id="lastname-field" class="login-form-field" placeholder="Last Name">
        <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
        <div class="tags-input-container" id="tags-input-container">
          <input type="text" name="subject" id="subject-field" class="login-form-field" placeholder="Favorite Subject">
        </div>
        <div id="subject-suggestions" class="suggestions-container"></div>
      </form>
      <input type="submit" value="Sign Up" id="login-form-submit" onclick="signIn()">
    </div>
  </main>

  <script>
    const subjects = [
      'Biology', 'Chemistry', 'Physics', 'Computer Science', 'History', 'Engineering', 'Cybersecurity', 'Psychology'
    ];

    const selectedSubjects = []; // Array to store selected subjects

    document.getElementById('subject-field').addEventListener('input', function() {
      const input = this.value.toLowerCase();
      const suggestionsContainer = document.getElementById('subject-suggestions');
      suggestionsContainer.innerHTML = '';

      if (input) {
        const filteredSubjects = subjects.filter(subject => subject.toLowerCase().includes(input));
        filteredSubjects.forEach(subject => {
          const suggestionDiv = document.createElement('div');
          suggestionDiv.className = 'suggestion';
          suggestionDiv.textContent = subject;
          suggestionDiv.onclick = function() {
            addTag(subject);
            suggestionsContainer.innerHTML = '';
            document.getElementById('subject-field').value = '';
          };
          suggestionsContainer.appendChild(suggestionDiv);
        });
      }
    });

    document.addEventListener('click', function(event) {
      const suggestionsContainer = document.getElementById('subject-suggestions');
      if (!suggestionsContainer.contains(event.target) && event.target.id !== 'subject-field') {
        suggestionsContainer.innerHTML = '';
      }
    });

    document.getElementById('tags-input-container').addEventListener('click', function() {
      document.getElementById('subject-field').focus();
    });

    function addTag(subject) {
      if (!selectedSubjects.includes(subject)) {
        selectedSubjects.push(subject);

        const tagsContainer = document.getElementById('tags-input-container');
        const tagDiv = document.createElement('div');
        tagDiv.className = 'tag';
        tagDiv.textContent = subject;

        const removeSpan = document.createElement('span');
        removeSpan.className = 'remove-tag';
        removeSpan.textContent = 'x';
        removeSpan.onclick = function() {
          removeTag(subject);
        };

        tagDiv.appendChild(removeSpan);
        tagsContainer.insertBefore(tagDiv, document.getElementById('subject-field'));

        console.log(selectedSubjects); // Log the array of selected subjects
      }
    }

    function removeTag(subject) {
      const index = selectedSubjects.indexOf(subject);
      if (index > -1) {
        selectedSubjects.splice(index, 1);
        const tagsContainer = document.getElementById('tags-input-container');
        tagsContainer.innerHTML = '';
        selectedSubjects.forEach(tag => addTag(tag));
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = 'subject';
        inputField.id = 'subject-field';
        inputField.className = 'login-form-field';
        inputField.placeholder = 'Favorite Subject';
        inputField.addEventListener('input', function() {
          const input = this.value.toLowerCase();
          const suggestionsContainer = document.getElementById('subject-suggestions');
          suggestionsContainer.innerHTML = '';

          if (input) {
            const filteredSubjects = subjects.filter(subject => subject.toLowerCase().includes(input));
            filteredSubjects.forEach(subject => {
              const suggestionDiv = document.createElement('div');
              suggestionDiv.className = 'suggestion';
              suggestionDiv.textContent = subject;
              suggestionDiv.onclick = function() {
                addTag(subject);
                suggestionsContainer.innerHTML = '';
                document.getElementById('subject-field').value = '';
              };
              suggestionsContainer.appendChild(suggestionDiv);
            });
          }
        });
        tagsContainer.appendChild(inputField);

        console.log(selectedSubjects); // Log the array of selected subjects
      }
    }

    var local = "http://localhost:8911";
    var deployed = "https://jcc.stu.nighthawkcodingsociety.com";

    function signIn() {
      console.log("button clicked");
      var email = document.getElementById('username-field').value;
      var password = document.getElementById('password-field').value;

      var requestBody = {
          email: email,
          password: password
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

      fetch(deployed + '/authenticate', requestOptions)
      .then((response => {
        if (!response.ok) {
            if (response.status == "401") {
              throw new Error("Invalid email or password")
            }
            else {
              throw new Error("HTTP Error: " + response.status)
            }
        }
        return response.json();
        })) // Get response text
        .then(data => {
          // Check response status
          console.log(data.message);
          localStorage.setItem('jwtToken', data.cookie);
          window.location.replace("{{site.baseurl}}/dashboard/");
          return;
        }
      )
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
  </script>
</body>
</html>
