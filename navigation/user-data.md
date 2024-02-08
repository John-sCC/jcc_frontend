---
layout: default
title: User Display (Test)
search_exclude: true
permalink: /user-disp-test/
---

<div id="debug_user_info_display">
    <h2>DEBUG USER SELCTOR</h2>
    <label>Enter a User's ID for data display (will be automatic when JWT sends consistently)</label>
    <input id="id_number" type="number" value="1">
    <button id="find_user" onclick="getUserData()">Search User</button>
</div>
<div id="dashboard_container" class="dashboard" style="display:none;">
    <h1>DASHBOARD</h1>
    <div id="assignment_container_container" class="container-container">
        <h2>Assignments</h2>
        <p class="subtitle">Here are some assignments for you to do.</p>
        <div id="assignment_container" class="container">
            <!-- Assignment cards will be dynamically added here -->
        </div>
    </div>
    <div id="student_class_container_container" class="container-container">
        <h2>Your Classes</h2>
        <p class="subtitle">You're a student in these classes.</p>
        <div id="student_class_container" class="container">
            <!--contains classes in which the student is a student-->
        </div>
    </div>
    <div id="leader_class_container_container" class="container-container">
        <h2>Classes You Lead</h2>
        <p class="subtitle">You play a leading role in these classes.</p>
        <div id="leader_class_container" class="container">
            <!--contains classes in which the person leads-->
        </div>
    </div>
</div>

<script>
    const local = 'http://localhost:8911';
    const deployed = 'https://jcc.stu.nighthawkcodingsociety.com';

    function getUserData() {
        // getting values from input fields
        var id = document.getElementById('id_number').value;
        // making the first fetch request
        fetch(deployed + '/api/class_period/students/' + String(id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(JSON.stringify(data));
            populateAssignmentContainer(data);
            populateClassesContainer(data, false);
            fetch(deployed + '/api/class_period/leaders/' + String(id), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(JSON.stringify(data));
                populateClassesContainer(data, true);
                document.getElementById("dashboard_container").style = "display:block;";
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function populateAssignmentContainer(studentData) {
        const container = document.getElementById('assignment_container');
        container.innerHTML = ''; // clear previous content
        for (var classPeriod of studentData) {
            var classPeriodName = classPeriod.name;
            for (var assignment of classPeriod.assignments) {
                var card = document.createElement('div');
                card.classList.add('card');

                var assignmentName = document.createElement('div');
                assignmentName.classList.add('main-name');
                assignmentName.textContent = assignment.name;
                
                // adding a click event listener to the assignmentName div
                assignmentName.setAttribute("onclick", "assignmentRedirect(" + String(assignment.id) + ")");

                var className = document.createElement('div');
                className.classList.add('second-name');
                className.textContent = classPeriodName;

                var dueDate = document.createElement('div');
                dueDate.classList.add('third-name');
                dueDate.textContent = `Due: ${new Date(assignment.dateDue).toLocaleDateString()}`;

                card.appendChild(assignmentName);
                card.appendChild(className);
                card.appendChild(dueDate);

                container.appendChild(card);
            }
        }
    }

    function populateClassesContainer(studentData, isLeader) {
        var bigContainer = document.getElementById('student_class_container_container');
        var container = document.getElementById('student_class_container');
        if (isLeader) {
            bigContainer = document.getElementById('leader_class_container_container');
            container = document.getElementById('leader_class_container');
        }
        container.innerHTML = '';

        for (var classPeriod of studentData) {
            var card = document.createElement('div');
            card.classList.add('card');

            var classPeriodName = document.createElement('div');
            classPeriodName.classList.add('main-name');
            classPeriodName.textContent = classPeriod.name;

            var leaderNames = document.createElement('div');
            leaderNames.classList.add('second-name');
            leaderNames.textContent = "Leaders: ";
            for (var i = 0; i < classPeriod.leaders.length; i++) {
                leaderNames.textContent += classPeriod.leaders[i].name;
                if ((i + 1) < classPeriod.leaders.length) {
                    leaderNames.textContent += ", ";
                }
            }

            var numberOfAssignments = document.createElement('div');
            numberOfAssignments.classList.add('third-name');
            var assNumber = classPeriod.assignments.length;
            var plurality = "s";
            if (assNumber == 1) plurality = "";
            numberOfAssignments.textContent = String(assNumber) + " Assignment" + plurality;

            card.appendChild(classPeriodName);
            card.appendChild(leaderNames);
            card.appendChild(numberOfAssignments);

            container.appendChild(card);
        }
        if (container.children.length === 0) {
            bigContainer.style.display = 'none';
        } else {
            bigContainer.style.display = 'block';
        }
    }

    function assignmentRedirect(id) {
        window.location.href = '{{site.baseurl}}/assignment-data?id=' + id;
    }

    /*
    function findUser() {
        // Get values from input fields
        var id = document.getElementById('id_number').value;
        // Make the fetch request
        fetch('http://localhost:8911/api/person/' + String(id), {//'https://jcc.stu.nighthawkcodingsociety.com/api/person/' + String(id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Print user data as JSON in the console
            console.log(JSON.stringify(data));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    */
</script>