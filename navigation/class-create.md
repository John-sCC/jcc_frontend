---
layout: default
title: Class Creation (Beta)
search_exclude: true
permalink: /class-create/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create a Class</title>
    <style>
        .whitebox {
            display: none;
        }
        .whitebox.show {
            display: block;
        }
        /* Styling for undo and redo buttons */
        .undo-redo-buttons {
            margin-top: 10px;
        }
        .undo-redo-buttons button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body class="light">
<div class="classflex-container">
    <div class="bigpapa">
        <div>
            <div class="classperiodcreation">
                <div id="classtitle" style="width: 850px;">Class Creation</div>
                <div style="padding-top: 25%;">
                    <label>Class Name:
                        <input id="className" class="inputis" placeholder="Enter Class Name...">
                    </label><br>
                </div>
                <div>
                    <label>Other Instructors:
                        <input id="newInstructor" class="inputis" placeholder="Enter Instructor Name...">
                        <button onclick="addInstructorToClass()">Add Instructor</button>
                    </label><br>
                </div>
                <div>Current Students:
                    <div id="curStu"><!--Insert stuff here--></div>
                </div>
                <div>Current Instructors:
                    <div id="curIns"><!--Insert stuff here--></div>
                    <br>
                </div>
            </div>
            <input class="createbutt" type="button" value="create" id="createButton">
            <div class="undo-redo-buttons">
                <button class="createbutt" id="undoButton">Undo</button>
                <button class="createbutt" id="redoButton">Redo</button>
            </div>
        </div>
        <div class="addstudents">
            <div class="toolbarss">
                <div id="stupiddiv">
                    <div>ADD STUDENTS TO CLASS</div>
                </div>
                <div style="width: 11%;">
                    <img class="hater" src="../images/a-z.png" onclick="sortStudents('asc')">
                </div>
                <div style="width: 11%;">
                    <img class="hater" src="../images/z-a.png" onclick="sortStudents('desc')">
                </div>
            </div>
            <div class="toolbarss">
                <div id="stupiddiv">
                    <div>SEARCH BY Subject</div>
                    <img id="arrow" src="../images/arrow.png">
                </div>
                <input id="subjectInput" style="width: 50%;" placeholder="Search..." oninput="getPersonsBySubject()">
                <div style="width: 13%;">
                    <img class="hater" src="../images/searchIcon.png">
                </div>
            </div>
            <div class="whitebox" id="subjectList">
            </div>
            <div class="toolbarss">
                <div id="stupiddiv">
                    <div>SEARCH BY STUDENT</div>
                </div>
                <input id="studentInput" style="width: 50%;" placeholder="Enter Student Name..." oninput="searchStudents()">
                <div style="width: 13%;">
                    <img class="hater" src="../images/searchIcon.png" onclick="searchStudents()">
                </div>
            </div>
            <div class="whitebox" id="studentList">
                <!-- Results will be inserted here -->
            </div>
        </div>
    </div>
    <br><br><br><br><br><br><br><br>
</div>
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
    var local = "http://localhost:8911";
    var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
    var studentIds = [];
    var leaderIds = [];
    var Myinstructors = [];
    var undoStack = [];
    var redoStack = [];
    var lastActionType = '';
    document.addEventListener('DOMContentLoaded', function() {
        fetch(`${deployed}/api/person/`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Use all persons as instructors
            data.forEach(person => {
                Myinstructors.push(person); // Add each person to Myinstructors array
            });
            console.log(Myinstructors);
            // Handle the instructors data as needed (e.g., display in UI)
            displayInstructors(Myinstructors);
        })
        .catch(error => {
            console.error('Error fetching persons:', error);
        });
    });
    document.getElementById('createButton').addEventListener('click', function() {
        const className = document.getElementById('className').value;
        const requestBody = {
            name: className,
            leaderIds: leaderIds,
            studentIds: studentIds
        };
        console.log(requestBody);
        fetch(`${deployed}/api/class_period/post`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(requestBody),
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Class created successfully!');
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error creating class');
        });
    });
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null; // Return null if the cookie is not found
    }
    // Add event listeners for undo and redo buttons
    document.getElementById('undoButton').addEventListener('click', undo);
    document.getElementById('redoButton').addEventListener('click', redo);
    // Function to handle undo operation
    function undo() {
        if (undoStack.length > 0) {
            var action = undoStack.pop(); // Remove the last action from undo stack
            redoStack.push(action); // Push the action to redo stack
            performUndoRedo(action, true);
        }
    }
    // Function to handle redo operation
    function redo() {
        if (redoStack.length > 0) {
            var action = redoStack.pop(); // Remove the last action from redo stack
            undoStack.push(action); // Push the action back to undo stack
            performUndoRedo(action, false);
        }
    }
    // Function to perform undo and redo actions
    function performUndoRedo(action, isUndo) {
        switch (action.type) {
            case 'ADD_STUDENT':
                const studentList = document.getElementById('curStu');
                if (isUndo) {
                    const lastStudentDiv = studentList.lastElementChild;
                    if (lastStudentDiv) {
                        studentList.removeChild(lastStudentDiv); // Remove the last added student
                        studentIds.pop(); // Remove the most recent ID added
                    }
                } else {
                    const studentDiv = document.createElement('div');
                    studentDiv.textContent = `Name: ${action.name}, Email: ${action.email}`;
                    studentList.appendChild(studentDiv);
                    studentIds.push(action.id); // Add the ID to the studentIds array      
                }
                break;
            // Add cases for other types of actions if needed
        }
    }
    function sortStudents(order) {
        alert('Sorting students in ' + order + ' order');
    }
    function searchStudents() {
        const query = document.getElementById('studentInput').value;
        alert('Searching for: ' + query);
    }
    function addStudentToClass(student) {
        const action = {
            type: 'ADD_STUDENT',
            id: student.id,
            name: student.name,
            email: student.email
        };
        undoStack.push(action); // Push the action to undo stack
        redoStack = []; // Clear redo stack when a new action is added
        lastActionType = 'ADD_STUDENT'; // Update last action type
        if (!studentIds.includes(student.id)) {
            studentIds.push(student.id);
            const curStuDiv = document.getElementById('curStu');
            const studentDiv = document.createElement('div');
            studentDiv.className = 'person-div';
            studentDiv.textContent = `Name: ${student.name}, Email: ${student.email}`;
            curStuDiv.appendChild(studentDiv);
        } else {
            alert('Student already added to the class.');
        }
    }   function addInstructorToClass() {
        const instructorName = document.getElementById('newInstructor').value.trim();
        const foundInstructor = Myinstructors.find(inst => inst.name === instructorName);
        if (foundInstructor) {
            const instructorId = foundInstructor.id;
            if (!leaderIds.includes(instructorId)) {
                leaderIds.push(instructorId);
                const curInsDiv = document.getElementById('curIns');
                const instructorDiv = document.createElement('div');
                instructorDiv.className = 'person-div';
                instructorDiv.textContent = `Name: ${foundInstructor.name}, Email: ${foundInstructor.email}`;
                curInsDiv.appendChild(instructorDiv);
            } else {
                alert('Instructor already added to the class.');
            }
        } else {
            alert('Instructor not found in Myinstructors array.');
        }
    }
    function searchInstructors() {
        const query = document.getElementById('newInstructor').value.trim();
        const instructorList = document.getElementById('instructorList');
        if (query.length < 1) {
            instructorList.classList.remove('show'); // Hide the white box if query is empty
            return; // Don't perform search if the query is empty
        }
        // Fetch data from the server based on the search query
        fetch(`${deployed}/api/person/searchInstructors/${query}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                instructorList.innerHTML = '<div>No instructors found for the given query.</div>';
                instructorList.classList.add('show'); // Show the white box with message
            } else {
                instructorList.innerHTML = ''; // Clear previous search results
                data.forEach(instructor => {
                    const instructorDiv = document.createElement('div');
                    instructorDiv.className = 'person-div';
                    instructorDiv.textContent = `Name: ${instructor.name}, Email: ${instructor.email}`;
                    const addButton = document.createElement('button');
                    addButton.textContent = 'Add';
                    addButton.onclick = () => addInstructorToClass(instructor);
                    instructorDiv.appendChild(addButton);
                    instructorList.appendChild(instructorDiv);
                });
                instructorList.classList.add('show'); // Show the white box with search results
            }
        })
        .catch(error => {
            console.error('Error searching for instructors:', error);
        });
    }
    function getPersonsBySubject() {
        const subject = document.getElementById('subjectInput').value.trim();
        const subjectList = document.getElementById('subjectList');
        if (subject.length < 1) {
            subjectList.classList.remove('show'); // Hide the white box if subject query is empty
            return;
        }
        // Fetch data from the server based on the subject query
        fetch(`${deployed}/api/person/getBySubject/${subject}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                subjectList.innerHTML = '<div>No persons found for the given subject.</div>';
                subjectList.classList.add('show'); // Show the white box with message
            } else {
                subjectList.innerHTML = ''; // Clear previous search results
                data.forEach(person => {
                    const personDiv = document.createElement('div');
                    personDiv.className = 'person-div';
                    personDiv.textContent = `Name: ${person.name}, Email: ${person.email}`;
                    const addButton = document.createElement('button');
                    addButton.textContent = 'Add';
                    addButton.onclick = () => addStudentToClass(person);
                    personDiv.appendChild(addButton);
                    subjectList.appendChild(personDiv);
                });
                subjectList.classList.add('show'); // Show the white box with search results
            }
        })
        .catch(error => {
            console.error('Error fetching persons by subject:', error);
        });
    }
</script>
</body>
</html>