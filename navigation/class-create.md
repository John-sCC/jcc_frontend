---
layout: default
title: Class Creation (Beta)
search_exclude: true
permalink: /class-create/
---

<h2>Create Class</h2>

<form id="postForm">
  <label for="name">Class Name:</label>
  <input type="text" id="name" name="name"><br><br>
  <label for="email">Teacher Email:</label>
  <input type="email" id="email" name="email"><br><br>
  <button type="submit">Submit</button>
</form>

<script>
document.getElementById("postForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the form data
  const formData = new FormData(this);
  
  // Construct the URL with query parameters
  const url = "https://jcc.stu.nighthawkcodingsociety.com/api/class_period/post?" + new URLSearchParams(formData).toString();
  
  // Make the POST request
  fetch(url, {
    method: "POST"
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log("Response:", data);
    // Handle the response as needed
  })
  .catch(error => {
    console.error("Error:", error);
    // Handle errors
  });
});
</script>