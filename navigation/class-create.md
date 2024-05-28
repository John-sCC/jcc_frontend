---
layout: default
title: Class Creation (Beta)
search_exclude: true
permalink: /class-create/
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create a Class</title>
    <style>
        /* Your existing styles */
    </style>
</head>
<body>
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
                        <button onclick="addInstructor()">Add Instructor</button>
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
            <button onclick="undo()">Undo</button>
            <button onclick="redo()">Redo</button>
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
    var local = "http://localhost:8911";
    var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
    var studentIds = [];
    var leaderIds = [];
    function addStudent() {
        const studentInput = document.getElementById('studentInput');
        const studentName = studentInput.value.trim();
        if (studentName) {
            const studentList = document.getElementById('curStu');
            const studentDiv = document.createElement('div');
            studentDiv.textContent = studentName;
            studentList.appendChild(studentDiv);
            studentIds.push(studentName);
            studentInput.value = '';
            fetch(`${local}/api/class_period/addStudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentName)
            });
        }
    }
    function addInstructor() {
        const instructorInput = document.getElementById('newInstructor');
        const instructorName = instructorInput.value.trim();
        if (instructorName) {
            const instructorList = document.getElementById('curIns');
            const instructorDiv = document.createElement('div');
            instructorDiv.textContent = instructorName;
            instructorList.appendChild(instructorDiv);
            leaderIds.push(instructorName);
            instructorInput.value = '';
            fetch(`${local}/api/class_period/addInstructor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(instructorName)
            });
        }
    }
    document.getElementById('createButton').addEventListener('click', function() {
        const className = document.getElementById('className').value;
        const requestBody = {
            name: className,
            leaderIds: leaderIds,
            studentIds: studentIds
        };
        fetch(`${local}/api/class_period/post`, {
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
    function undo() {
        fetch(`${local}/api/class_period/undo`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(action => {
            if (action) {
                if (action.type === 'ADD_STUDENT') {
                    // Remove the last added student from the current students list
                    const studentList = document.getElementById('curStu');
                    const lastStudentDiv = studentList.lastElementChild;
                    if (lastStudentDiv) {
                        studentList.removeChild(lastStudentDiv);
                    }
                }
                // Handle other undo actions if needed
            }
        });
    }
    function redo() {
        fetch(`${local}/api/class_period/redo`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(action => {
            if (action) {
                if (action.type === 'ADD_STUDENT') {
                    // Redo the last undone action by adding the student back to the list
                    const studentList = document.getElementById('curStu');
                    const studentDiv = document.createElement('div');
                    studentDiv.textContent = action.name;
                    studentList.appendChild(studentDiv);
                }
                // Handle other redo actions if needed
            }
        });
    }
    function sortStudents(order) {
        alert('Sorting students in ' + order + ' order');
    }
    function searchStudents() {
        const query = document.getElementById('studentInput').value;
        alert('Searching for: ' + query);
    }
    function addStudentToClass(student) {
        if (!studentIds.includes(student.email)) {
            studentIds.push(student.email);
            const curStuDiv = document.getElementById('curStu');
            const studentDiv = document.createElement('div');
            studentDiv.className = 'person-div';
            studentDiv.textContent = `Name: ${student.name}, Email: ${student.email}`;
            curStuDiv.appendChild(studentDiv);
        } else {
            alert('Student already added to the class.');
        }
    }
    function getPersonsBySubject() {
        const subject = document.getElementById('subjectInput').value.trim();
        if (subject.length < 1) {
            document.getElementById('subjectList').innerHTML = '';
            return;
        }
        fetch(`${local}/api/person/getBySubject/${subject}`, {
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
            const subjectList = document.getElementById('subjectList');
            subjectList.innerHTML = '';
            if (data.length === 0) {
                subjectList.textContent = 'No persons found for the given subject.';
            } else {
                data.forEach(person => {
                    console.log(person);
                    const personDiv = document.createElement('div');
                    personDiv.className = 'person-div';
                    personDiv.textContent = `Name: ${person.name}, Email: ${person.email}`;
                    const addButton = document.createElement('button');
                    addButton.textContent = 'Add';
                    addButton.onclick = () => addStudentToClass(person);
                    personDiv.appendChild(addButton);
                    subjectList.appendChild(personDiv);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching persons by subject:', error);
        });
    }
</script>
</body>
</html>