---
layout: default
title: Image Recognition
hide: true
permalink: /image-rec/
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

<head>
    <link rel="stylesheet" href="https://unpkg.com/cropperjs@1.5.12/dist/cropper.css">
</head>

<body>
    <h2>File Upload</h2> 
    <input type="file" id="fileInput" style="display: none">
    <label class="label" for="fileInput" id="customButton">Choose a File</label>
      <p id="fileName"></p>
      <div>
          <img id="previewImage" alt="Preview" style="max-width: 100%;">
      </div>
    <button class="button" id="cropButton" onclick="cropImage()">Crop Image</button>
    <div>
        <img id="croppedImage" alt="Cropped Image">
  </div>
<script src="https://unpkg.com/cropperjs@1.5.12/dist/cropper.js"></script>

<script>
    let cropper;

    document.getElementById('fileInput').addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    // Display selected file name
    document.getElementById('fileName').innerHTML = `Selected File: ${file.name}`;

    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('previewImage').src = reader.result;

        // Reset the Cropper instance with the new image
        if (cropper) {
        cropper.destroy(); // Destroy the existing Cropper instance
        }

        cropper = new Cropper(document.getElementById('previewImage'), {
        aspectRatio: 0,
        viewMode: 2,
        });

        document.getElementById('cropButton').style.display = 'block';
    };
    reader.readAsDataURL(file);
    }

    function cropImage() {
        const croppedData = cropper.getCroppedCanvas().toDataURL();
        document.getElementById('croppedImage').src = croppedData;
        fetcher(croppedData);
    }

    function fetcher(croppedData) {
         const arr = croppedData.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        const blob = new Blob([u8arr], { type: mime });
        const file = new File([blob], 'croppedImage.png', { type: 'image/png' });

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('image', file);

        fetch('https://jcc.stu.nighthawkcodingsociety.com/image/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('OCR Result:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  </script>
</body>