---
title: 'JCC - Image Recognition Progress Made'
layout: post
description : Automatically Populated Github Issue
---

## Image Recognition

## Key Commits:
[Backend-Uploading](https://github.com/John-sCC/jcc_backend/commit/451f1cde2a399ba5258a8c1537d56f9e081cf11b)
[Backend-OCR functionality](https://github.com/John-sCC/jcc_backend/commit/c2102acabe92c44949b613c584a2d93d99b8c873)
[Frontend-Fix Cropping](https://github.com/John-sCC/jcc_frontend/commit/3e71fb977c15bfe63c004f7cab8a61ee24fd96fe)
[Frontend-Images are reloaded on Upload](https://github.com/John-sCC/jcc_frontend/commit/6aee199f18f8cd28c6019608a47d7ca5e00b8148)

### What has been accomplished (Backend)
Summary: The backend now has an api endpoint that receives an image and outputs all numbers recognized and identified in the image. 
When the image is uploaded, it is first stored into a temporary directory before being stored in the file system under the "./imagerec/StoredImages" folder. Then it uses the OCRService to simply call the Tesseract API and return its output:
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/14d52fc0-0978-401e-9161-c97e024d0250)
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/b0061482-0a26-4473-ab84-79d253c1a37e)

### What has been accomplished (Frontend)
Summary: The frontend allows users to upload an image (currently the image only works with typed content because Tesseract struggles to recognize handwriting) and the crop the image to show only the numbers before sending the new cropped image to the backend.
It makes use of the cropper.js library and provides image previews of both the pre-cropped image and the post-cropped image. 
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/cc871b48-865c-40c6-a946-b401aab13e56)
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/1c96a4fa-1c63-4a72-b77b-278a43f17f3e)
For the future, we can add a default image that displays in the preview section before any file has been uploaded

## Image Recognition

### What has been accomplished (Backend)
Summary: The backend now has an api endpoint that receives an image and outputs all numbers recognized and identified in the image. 
When the image is uploaded, it is first stored into a temporary directory before being stored in the file system under the "./imagerec/StoredImages" folder. Then it uses the OCRService to simply call the Tesseract API and return its output:
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/14d52fc0-0978-401e-9161-c97e024d0250)
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/b0061482-0a26-4473-ab84-79d253c1a37e)

### What has been accomplished (Frontend)
Summary: The frontend allows users to upload an image (currently the image only works with typed content because Tesseract struggles to recognize handwriting) and the crop the image to show only the numbers before sending the new cropped image to the backend.
It makes use of the cropper.js library and provides image previews of both the pre-cropped image and the post-cropped image. 
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/cc871b48-865c-40c6-a946-b401aab13e56)
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/1c96a4fa-1c63-4a72-b77b-278a43f17f3e)
For the future, we can add a default image that displays in the preview section before any file has been uploaded

| Raymond Sheng | [Backend-Uploading](https://github.com/John-sCC/jcc_backend/commit/451f1cde2a399ba5258a8c1537d56f9e081cf11b), [Backend-OCR functionality](https://github.com/John-sCC/jcc_backend/commit/c2102acabe92c44949b613c584a2d93d99b8c873), [Frontend-Fix Cropping](https://github.com/John-sCC/jcc_frontend/commit/3e71fb977c15bfe63c004f7cab8a61ee24fd96fe), [Frontend-Images are reloaded on Upload](https://github.com/John-sCC/jcc_frontend/commit/6aee199f18f8cd28c6019608a47d7ca5e00b8148)  | I finished both the frontend and backend integration for the image recognition/OCR aspect of our stats app, centering on an easier uploading of data. I was primarily responsible for integrating Tesseract into our project backend. |


