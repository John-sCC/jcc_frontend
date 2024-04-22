---
layout: default
title: Student Search
hide: true
permalink: /search/
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Selection</title>
    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .title-container {
            text-align: center;
             margin-top: 50px;
        }
        .title {
            font-size: 36px;
            font-weight: bold;
            color: #333;
            text-transform: uppercase;
        }
        h1, h2 {
            margin-bottom: 10px;
        }

        form {
            margin-bottom: 20px;
        }

        label {
            display: inline-block;
            width: 150px;
            margin-bottom: 5px;
        }

        input[type="text"], input[type="number"] {
            width: 300px;
            padding: 5px;
        }

        button {
            padding: 8px 15px;
            cursor: pointer;
        }

        #studentList {
            margin-top: 10px;
            list-style-type: none;
            padding-left: 0;
        }

        #studentList li {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <h1>Student Selection</h1>
    <h2>Add New Student</h2>
    <form id="addStudentForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        <label for="subjects">Subjects Known (comma-separated):</label>
        <input type="text" id="subjects" name="subjects" required><br><br>
        <label for="location">Preferred Location:</label>
        <input type="text" id="location" name="location" required><br><br>
        <label for="internship">Internship Preferred:</label>
        <input type="checkbox" id="internship" name="internship"><br><br>
        <button type="button" onclick="addStudent()">Add Student</button>
    </form>
    <h2>Find Most Relevant Student</h2>
    <form id="findMostRelevantStudentForm">
        <label for="newStudentName">Name:</label>
        <input type="text" id="newStudentName" required><br><br>
        <label for="newStudentSubjects">Subjects Known (comma-separated):</label>
        <input type="text" id="newStudentSubjects" required><br><br>
        <label for="newStudentLocation">Preferred Location:</label>
        <input type="text" id="newStudentLocation" required><br><br>
        <label for="newStudentInternship">Internship Preferred:</label>
        <input type="checkbox" id="newStudentInternship"><br><br>
        <button type="button" onclick="findMostRelevantStudent()">Find Most Relevant Student</button>
    </form>
    <h2>Display All Students</h2>
    <button type="button" onclick="getAllStudents()">Get All Students</button>
    <ul id="studentList"></ul>
    <div id="result"></div>

    <script>
        // Function to add a new student
        function addStudent() {
            const studentData = {
                name: $('#name').val(),
                subjectsKnown: $('#subjects').val().split(',').map(subject => subject.trim()),
                preferredLocation: $('#location').val(),
                internshipPreferred: $('#internship').is(':checked')
            };

            fetch('http://localhost:8911/api/student/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            })
            .then(response => response.text())
            .then(message => alert(message))
            .catch(error => console.error('Error:', error));
        }

        // Function to find the most relevant student
        function findMostRelevantStudent() {
            const newStudentData = {
                name: $('#newStudentName').val(),
                subjectsKnown: $('#newStudentSubjects').val().split(',').map(subject => subject.trim()),
                preferredLocation: $('#newStudentLocation').val(),
                internshipPreferred: $('#newStudentInternship').is(':checked')
            };

            fetch('http://localhost:8911/api/student/findMostRelevant?k=3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudentData),
            })
            .then(response => response.json())
            .then(data => {
                $('#result').text(`Most relevant student: ${data.name}`);
            })
            .catch(error => {
                console.error('Error:', error);
                $('#result').text('Error finding the most relevant student.');
            });
        }

        // Function to fetch all students and display them
        function getAllStudents() {
            fetch('http://localhost:8911/api/student/allStudents')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const studentList = $('#studentList');
                // Clear previous list items if any
                studentList.empty();
                data.forEach(student => {
                    studentList.append(`<li>Name: ${student.name}, Subjects: ${student.subjectsKnown.join(', ')}, Location: ${student.preferredLocation}</li>`);
                });
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                alert('Error fetching students. Please try again.');
            });
        }
    </script>
</body>
</html>
