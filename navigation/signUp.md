---
layout: default
title: Sign-Up
permalink: /sign-up/
---

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
      align-items: center;
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
      z-index: 100;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-top: 5px; /* Optional: Add some space between the input and dropdown */
    }

    .suggestion {
      padding: 8px;
      color: black;
      cursor: pointer;
    }

    .suggestion:hover {
      background-color: #f0f0f0;
    }
  </style>
</head>
<body class="light">
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
          <input type="text" id="subject-input" placeholder="Favorite Subject">
        </div>
        <div id="subject-suggestions" class="suggestions-container"></div>
      </form>
      <input type="submit" value="Sign Up" id="login-form-submit">
    </div>
  </main>

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

    const subjects = [
      'Biology', 'Chemistry', 'Physics', 'Computer Science', 'History', 'Engineering', 'Cybersecurity', 'Psychology','Bioengineering','Biochemistry','Calculus','Statistics','English','Literature','Physical Education','ENS','3D Animation','Studio Art','Music Theory','Art History','Government and Politics','Environmental Science'
    ];

    const selectedSubjects = []; // Array to store selected subjects

    document.getElementById('subject-input').addEventListener('input', function() {
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
            document.getElementById('subject-input').value = '';
          };
          suggestionsContainer.appendChild(suggestionDiv);
        });
      }
    });

    document.addEventListener('click', function(event) {
      const suggestionsContainer = document.getElementById('subject-suggestions');
      if (!suggestionsContainer.contains(event.target) && event.target.id !== 'subject-input') {
        suggestionsContainer.innerHTML = '';
      }
    });

    document.getElementById('tags-input-container').addEventListener('click', function() {
      document.getElementById('subject-input').focus();
    });

    document.getElementById('subject-input').addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && this.value.trim() !== '') {
        event.preventDefault();
        addTag(this.value.trim());
        this.value = '';
      }
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
        tagsContainer.insertBefore(tagDiv, document.getElementById('subject-input'));

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
        inputField.id = 'subject-input';
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
                document.getElementById('subject-input').value = '';
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
    const currentUrl = window.location.href;
    var fetchUrl = deployed;
    if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
        fetchUrl = local;
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
    document.getElementById('login-form-submit').addEventListener('click', function(event) { //Used for backend
      event.preventDefault();

      const email = document.getElementById('username-field').value;
      const password = document.getElementById('password-field').value;
      const name = document.getElementById('firstname-field').value + ' ' + document.getElementById('lastname-field').value;
      const usn = email; // Assuming USN is the same as email
      const subjectsOfInterest = selectedSubjects;

      const requestBody = {
        email: email,
        password: password,
        name: name,
        usn: usn,
        subjectsOfInterest: subjectsOfInterest
      };

      console.log(requestBody);

      fetch(fetchUrl + '/api/person/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text().then(text => {
          // Try to parse the response as JSON
          try {
            return JSON.parse(text);
          } catch (error) {
            // If parsing fails, return the text as is
            return text;
          }
        });
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
      window.location.replace("{{site.baseurl}}/sign-in/");
    });
  </script>
</body>
</html>

