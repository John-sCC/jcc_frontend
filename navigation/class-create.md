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
        ::placeholder {
            font-size: 25px;
        }
        .classtitle {
            width: 100px; /* Set the width to 100px */
            margin: 10 auto; /* Center the element */
        }
        .inputis {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            box-sizing: border-box;
        }
        .createbutt {
            padding: 10px 20px;
            font-size: 16px;
            margin-top: 10px;
            cursor: pointer;
        }
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
                        <input id="Teachers" class="inputis" placeholder="Enter Instructors Name...">
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
                    <div>SEARCH BY NAME</div>
                    <img id="arrow" src="../images/arrow.png">
                </div>
                <input id="studentsearc" style="width: 50%;" placeholder="Search..." oninput="getPersonsBySubject()">
                <div style="width: 13%;">
                    <img class="hater" src="../images/searchIcon.png">
                </div>
            </div>
            <div class="whitebox" id="studentList">
                <p>hellodd</p>  <!--This is gonna have all the classes appear, I don't know how to do that-->
            </div>
            <div class="toolbarss">
                <div id="stupiddiv">
                    <div>SEARCH BY SUBJECT</div>
                </div>
                <input id="subjectInput" style="width: 50%;" placeholder="Enter Subject..." oninput="getPersonsBySubject()">
                <div style="width: 13%;">
                    <img class="hater" src="../images/searchIcon.png" onclick="getPersonsBySubject()">
                </div>
            </div>
            <div class="whitebox" id="subjectList">
                <!-- Results will be inserted here -->
            </div>
        </div>
    </div>
    <br><br><br><br><br><br><br><br>
</div>
<script>
    var local = "http://localhost:8911";
    var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
    document.getElementById('createButton').addEventListener('click', function() {
        const className = document.getElementById('className').value;
        const teachers = document.getElementById('Teachers').value;
        alert('Class Name: ' + className + '\nInstructors: ' + teachers);
        // Add your logic to handle the creation of the class here
    });
    function sortStudents(order) {
        // Add your logic to sort students here
        alert('Sorting students in ' + order + ' order');
    }
    function searchStudents() {
        // Add your logic to search students here
        const query = document.getElementById('studentsearc').value;
        alert('Searching for: ' + query);
    }
    function getPersonsBySubject() {
        const subject = document.getElementById('subjectInput').value;
        fetch(`http://localhost:8911/api/person/getBySubject/Chemistry`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const subjectList = document.getElementById('subjectList');
                subjectList.innerHTML = '';
                data.forEach(person => {
                    console.log(person);
                    const personDiv = document.createElement('div');
                    personDiv.textContent = `Name: ${person.name}, Email: ${person.email}`;
                    subjectList.appendChild(personDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching persons by subject:', error);
            });
    }
</script>
</body>
</html>
