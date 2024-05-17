---
title: 'Assignment Objects'
layout: post
description : Automatically Populated Github Issue
---

## Assignment Objects
As our tagline has been "Canvas but Better", we are beginning to incorporate assignment tracking into our submissions. Our broad goal in this was to define a way for teachers to be able to see the number of submissions and the time of submissions similar to Canvas. However, we have been debating whether we need to link this directly to a Person object or not. Currently we have a frontend framework that provides us with some basic functionality, and a backend that takes in file uploads and restores them in the backend filesystem. 

We currently have functionality for uploading a submission as well as ensuring the submission is of a valid file type:
```java
   @PostMapping("/upload")
      public ResponseEntity<String> handleFileUpload(@RequestPart("file") MultipartFile file) {
        try {
            //check if file type is null: edge case
            String contentType = file.getContentType();

            if (contentType == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File content type is not supported");
            }

            String fileExtension = getFileExtension(file.getOriginalFilename());

            if (!isValidFileType(fileExtension, contentType)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File type is not supported");
            }
    
            // Create the temporary upload directory if it doesn't exist
            File tempDirectory = new File(tempUploadDir);
            if (!tempDirectory.exists()) {
                tempDirectory.mkdirs();
            }

            // Save the file to the temporary upload directory
            String tempFilePath = tempUploadDir + File.separator + file.getOriginalFilename();
            file.transferTo(new File(tempFilePath));

            // Move the file to the final destination
            String finalFilePath = uploadDir + File.separator + file.getOriginalFilename();
            new File(tempFilePath).renameTo(new File(finalFilePath));
            
            return ResponseEntity.ok(finalFilePath);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file");
        }
    }

    private boolean isValidFileType(String fileExtension, String contentType) {
        HashMap<String, String> fileTypes = new HashMap<>();
        fileTypes.put("pdf", MediaType.APPLICATION_PDF_VALUE);
        fileTypes.put("jpg", MediaType.IMAGE_JPEG_VALUE);
        fileTypes.put("jpeg", MediaType.IMAGE_JPEG_VALUE);
        fileTypes.put("png", MediaType.IMAGE_PNG_VALUE);
        fileTypes.put("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        
        if (fileTypes.containsKey(fileExtension) && fileTypes.get(fileExtension).equals(contentType))
        {
            return true;
        }
        return false;
    }
    
    private String getFileExtension(String filename) {
        if (filename == null) {
            return null;
        }
        int dotIndex = filename.lastIndexOf('.');
        return filename.substring(dotIndex + 1);
    }

This ensures that only pdfs, jpgs, jpegs, pngs, and docx file types are allowed to be uploaded as submissions.
Each uploaded file, if it is valid, is stored in a backend folder.

![image](https://github.com/John-sCC/jcc_frontend/assets/142441804/fce69654-4c53-41ef-8532-e490457d61ed)



