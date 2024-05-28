---
layout: default
title: Submit Assignments
hide: true
permalink: /assigning-upload/
---

<style>
  @font-face {
    font-family: 'Collegiate Inside';
    src: url("/jcc_frontend/assets/fonts/CollegiateInsideFLF.ttf");
    font-weight: normal;
    font-style: normal;
  }

  body {
    justify-content: center;
    text-align: center;

    h2 {
      color: white;
      font-family: 'Collegiate Inside';
      font-weight: bold;
    }
  }

  .button {
    width: 20%;
    height: 50px;
    background-color: rgb(0, 33, 71); 
    color: white;
    border-radius: 10px;
    margin: auto;
    padding: auto;
    display: flex;
  }

  .label {
    width: auto;
    height: auto;
    background-color: darkgrey;
    margin: auto;
    padding: auto;
  }
  
</style>

<body class="light">
    <h2>File Upload</h2> 
    <input type="file" id="fileInput" style="display: none">
    <label class="label" for="fileInput" id="customButton">Choose a File</label>
    <p id="fileName"></p>
    <button class="button" id="upload" onclick="upload()">Submit Assignment</button>

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

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8911/api/assignment/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const filePath = await response.text();
        console.log('File uploaded successfully:', filePath);
        document.getElementById('fileName').innerText = `File Name: ${file.name}`;

    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
};

function upload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        uploadFile(file);
    } else {
        console.error('No file selected');
    }
}

// Update the custom button text when a file is selected
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0].name;
    document.getElementById('customButton').innerText = fileName;
});

</script>
</body>
