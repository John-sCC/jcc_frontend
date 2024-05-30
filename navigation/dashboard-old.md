---
layout: default
title: Dashboard
search_exclude: true
permalink: /dashboard-old/
---
<body class="light">
<!--<button id="test_button" onclick="getUserData()">Click here for test</button>-->
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
        <p class="subtitle">You play a leading role in these classes. <a href="{{site.baseurl}}/class-create/">Click here</a> to create a new class.</p>
        <div id="leader_class_container" class="container">
            <!--contains classes in which the person leads-->
        </div>
    </div>
    <div id="stats_resources_container_container" class="container-container">
        <h2>Statistics/Data Resources</h2>
        <p class="subtitle">Here are some resources for your statistical journey.</p>
        <div id="stats_resources_container" class="container">
            <div class="card">
                <div class="main-name" onclick="generalRedirect('/2024/01/25/qrcodetestbackend.html')">QR Code Generator</div>
                <div class="second-name">Great for stats projects!</div>
            </div>
            <div class="card">
                <div class="main-name">Graphing Resources</div>
                <div class="second-name">Stapplet but better!</div>
            </div>
            <div class="card">
                <div class="main-name" onclick="generalRedirect('/image-rec/')">Image Recognition</div>
                <div class="second-name">Part of making Stapplet not suck!</div>
            </div>
            <div class="card">
                <div class="main-name" onclick="generalRedirect('/tablegenerator')">Table Generator</div>
                <div class="second-name">Great for teachers like Mr. Jenkins!</div>
            </div>
        </div>
    </div>
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

    // Check if the required cookie is present on page load
    // window.addEventListener('load', function() {
    //     if (!hasCookie('jwt')) {
    //         // Redirect to the login page if the cookie is not present
    //         window.location.href = '/sign-in/'; // Replace '/login' with your actual login page URL
    //     }
    // });

    // // Function to check if a cookie is present
    // function hasCookie(cookieName) {
    //     return document.cookie.split(';').some((cookie) => cookie.trim().startsWith(cookieName + '='));
    // }

    window.addEventListener('load', function() {
        getUserData();
    });


    var local = "http://localhost:8911";
    var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
    const currentUrl = window.location.href;
    var fetchUrl = deployed;
    if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
        fetchUrl = local;
    }

    function getUserData() {
        // making the fetch request
        fetch(local + '/api/class_period/dashboard', {
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
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
            console.log(JSON.stringify(data));
            populateAssignmentContainer(data.student);
            populateClassesContainer(data.student, false);
            populateClassesContainer(data.leader, true);
            document.getElementById("dashboard_container").style = "display:block;";
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            //window.location.replace("{{site.baseurl}}/sign-in/");
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

            // adding a click event listener to the assignmentName div
            if (isLeader) {
                classPeriodName.setAttribute("onclick", "classLeaderRedirect(" + String(classPeriod.id) + ")");
            } else {
                classPeriodName.setAttribute("onclick", "classStudentRedirect(" + String(classPeriod.id) + ")");
            }

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

    function classStudentRedirect(id) {
        window.location.href = '{{site.baseurl}}/student-class-data?id=' + id;
    }

    function classLeaderRedirect(id) {
        window.location.href = '{{site.baseurl}}/leader-class-data?id=' + id;
    }

    function generalRedirect(urlExtension) {
        window.location.href = '{{site.baseurl}}' + urlExtension;
    }
</script>