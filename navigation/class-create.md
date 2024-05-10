---
layout: default
title: Class Creation (Beta)
search_exclude: true
permalink: /class-create/
---

<h2>Create Class</h2>

<form id="postForm">
  <label for="name">Class Name:</label>
  <input type="text" id="name" name="name"><br>
  <button type="submit">Submit</button>
</form>

<script>
  const local = "http://localhost:8911/api/class_period/post?";
  const deployed = "https://jcc.stu.nighthawkcodingsociety.com/api/class_period/post?";

  document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the form data
    const formData = new FormData(this);

    // Make the POST request
    fetch(deployed + new URLSearchParams(formData).toString(), {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
          "content-type": "application/json",
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Response:", data);
      var classId = data.id;
      window.location.href = '{{site.baseurl}}/leader-class-data?id=' + classId;
      return;
    })
    .catch(error => {
      console.error("Error:", error);
      // Handle errors
    });
  });
</script>