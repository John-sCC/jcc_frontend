---
layout: default
title: AI Checker
permalink: /aichecker/
---

<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Checker</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
</head>

<body class="light">
  <main id="main-holder">
    <div id="brand-logo">
      <img src="../images/icons/dnhs_logo.png" id="brand-logo-img" alt="Brand Logo">
    </div>
    <div id="text-div">
      <form id="text-form">
        <input type="text" name="name" id="name-field" class="login-form-field">
        <textarea name="text" id="text-field" rows="10" cols="50"></textarea>
      </form>
      <input type="submit" value="Create" id="text-create" onclick="createText()">
      <input type="submit" value="Get" id="text-create" onclick="getText()">
      <input type="submit" value="Update" id="text-create" onclick="updateText()">
      <input type="submit" value="Check" id="text-create" onclick="checkText()">
      <input type="submit" value="Delete" id="text-create" onclick="deleteText()">
    </div>
  </main>
</body>

</html>

<script>
  const brandLogoImg = document.getElementById('brand-logo-img');
  window.onload = (event) => {
      console.log("Page is fully loaded");
      let DarkMode = localStorage.getItem('DarkMode');
      DarkMode = (DarkMode === 'true'); // Convert to boolean
      console.log(DarkMode);
      if (DarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        if (brandLogoImg) {
                  console.log("dark")
                  brandLogoImg.src = "../images/icons/alternate_dnhs_logo.png";
        }
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        if (brandLogoImg) {
                  brandLogoImg.src = "../images/icons/dnhs_logo.png";
        }
      }
};

  // function themeChange() {
  //           const DarkMode = JSON.parse(localStorage.getItem('DarkMode')) || false;
  //           const newDarkMode = !DarkMode;
  //           if (DarkMode) {
  //               document.body.classList.add('dark');
  //               document.body.classList.remove('light');
                // if (brandLogoImg) {
                //   console.log("dark")
                //   brandLogoImg.src = "../images/icons/alternate_dnhs_logo.png";
                // }
  //           } else {
  //               document.body.classList.add('light');
  //               document.body.classList.remove('dark');
              //  if (brandLogoImg) {
              //     brandLogoImg.src = "../images/icons/dnhs_logo.png";
              //   }
  //           }
  //           localStorage.setItem('DarkMode', JSON.stringify(newDarkMode));
  // }

  var local = "http://localhost:8911/api/texts";
  var deployed = "https://jcc.stu.nighthawkcodingsociety.com/api/texts";
  const currentUrl = window.location.href;
  var fetchUrl = deployed;
  if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
    fetchUrl = local;
  }

  function createText() {
    console.log("creating text");
    var name = document.getElementById('name-field').value;
    var text = document.getElementById('text-field').value;

    var requestBody = {
        name: name,
        text: text
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
   
    fetch(fetchUrl + '/create', requestOptions)
    .then((response => {
      if (!response.ok) {
          if (response.status == "401") {
            throw new Error("Invalid name")
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
        return;
      }
    )
    .catch(error => {
        console.error('There was an error:', error);
    });
  }

  function getText() {
    console.log("getting text");
    var name = document.getElementById('name-field').value;

    var requestBody = {
        name: name,
    };

    var requestOptions = {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        body: JSON.stringify(requestBody),
        headers: {
            "content-type": "application/json",
        },
    };
   
    fetch(fetchUrl + '/get', requestOptions)
    .then((response => {
      if (!response.ok) {
          if (response.status == "401") {
            throw new Error("Invalid name")
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
        return;
      }
    )
    .catch(error => {
        console.error('There was an error:', error);
    });
  }

  function updateText() {
    console.log("updating text");
    var name = document.getElementById('name-field').value;
    var text = document.getElementById('text-field').value;

    var requestBody = {
        name: name,
        text: text
    };

    var requestOptions = {
        method: 'PUT',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        body: JSON.stringify(requestBody),
        headers: {
            "content-type": "application/json",
        },
    };
   
    fetch(fetchUrl + '/updateText', requestOptions)
    .then((response => {
      if (!response.ok) {
          if (response.status == "401") {
            throw new Error("Invalid name")
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
        return;
      }
    )
    .catch(error => {
        console.error('There was an error:', error);
    });
  }

  function checkText() {
    console.log("checking text");
    var name = document.getElementById('name-field').value;
    var text = document.getElementById('text-field').value;

    var requestBody = {
        key: '3FD1RYDAROYHTMOX0XL7PLKTFP06WTCP',
        text: text
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
   
    fetch('https://api.sapling.ai/api/v1/aidetect', requestOptions)
    .then((response => {
      if (!response.ok) {
          if (response.status == "401") {
            throw new Error("Invalid name")
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
        return;
      }
    )
    .catch(error => {
        console.error('There was an error:', error);
    });

    var requestBody = {
        name: name,
        score: 50
    };

    var requestOptions = {
        method: 'PUT',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        body: JSON.stringify(requestBody),
        headers: {
            "content-type": "application/json",
        },
    };
   
    fetch(fetchUrl + '/updateScore', requestOptions)
    .then((response => {
      if (!response.ok) {
          if (response.status == "401") {
            throw new Error("Invalid name")
          }
          else {
            throw new Error("HTTP Error: " + response.status)
          }
      }
      console.log("success!");
      console.log(response);
      return response.json();
      })) // Get response text
      .then(data => {
        // Check response status
        console.log(data.message);
        return;
      }
    )
    .catch(error => {
        console.error('There was an error:', error);
    });
  }

  function deleteText() {
    console.log("deleting text");
    var name = document.getElementById('name-field').value;

    var requestBody = {
        name: name,
    };

    var requestOptions = {
        method: 'DELETE',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        body: JSON.stringify(requestBody),
        headers: {
            "content-type": "application/json",
        },
    };
   
    fetch(fetchUrl + '/delete', requestOptions)
    .then((response => {
      if (!response.ok) {
          if (response.status == "401") {
            throw new Error("Invalid name")
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
        return;
      }
    )
    .catch(error => {
        console.error('There was an error:', error);
    });
  }
</script>