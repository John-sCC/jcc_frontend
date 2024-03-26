---
title: 'Backend: Assignment object'
layout: post
description : Automatically Populated Github Issue
---

## [Assignment Branch](https://github.com/John-sCC/jcc_backend/tree/assignment_object)

### Data of Assignment:
- ID (auto generated)
- Name (given by assigner)
- CreatedBy (person object)
- DateCreated (sent from frontend)
- DateDue (given by assigner)
- Classes (arraylist, ClassPeriod)
- Content (HTML stored?)
- Attachments  

### Possibility for uploading images to the backend 

On the frontend you can use html to easily create a form for uploading files. <input type="file">

we need to implement a server-side endpoint to handle file uploads

you can use the BLOB (Binary Large Object) data type to store images or any other binary content
Steps by chatgpt:

- create table in sqlite database with a BLOB column
```
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class CreateTable {
    public static void main(String[] args) {
        try {
            Connection connection = DriverManager.getConnection("jdbc:sqlite:your_database.db");
            Statement statement = connection.createStatement();

            // Create the images table
            statement.execute("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, image_data BLOB)");

            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

- handle the file upload, read binary data, insert into database
```
import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class InsertImage {
    public static void main(String[] args) {
        try {
            Connection connection = DriverManager.getConnection("jdbc:sqlite:your_database.db");

            // Read binary data from the uploaded image file
            File imageFile = new File("path/to/uploaded/image.jpg");
            FileInputStream fis = new FileInputStream(imageFile);
            byte[] imageBytes = new byte[(int) imageFile.length()];
            fis.read(imageBytes);
            fis.close();

            // Insert binary data into the database
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO images (image_data) VALUES (?)");
            preparedStatement.setBytes(1, imageBytes);
            preparedStatement.executeUpdate();

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

- query the database and retrieve binary data to serve as image content
```
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RetrieveImage {
    public static void main(String[] args) {
        try {
            Connection connection = DriverManager.getConnection("jdbc:sqlite:your_database.db");

            // Query the database to get the binary data of the image
            int imageId = 1; // Replace with the actual image ID
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT image_data FROM images WHERE id = ?");
            preparedStatement.setInt(1, imageId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                // Retrieve binary data
                byte[] imageBytes = resultSet.getBytes("image_data");

                // Process or display the image data as needed
                // ...

            } else {
                System.out.println("Image not found");
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

Code was taken directly from ChatGPT to be used as an example. It's likely needed to be altered to work with our website.

We need to implement security measures to make sure uploaded files are not malicious

Create an endpoint or mechanism to retrieve and display uploaded images on your website

