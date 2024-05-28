---
layout: default
title: Student Class Data
search_exclude: true
permalink: /student-class-data
---
<body class="light">
<div class="class-period">
    <h1 id="class_name"></h1>
    <h3 id="class_leaders">Loading...</h3>
    <h2>Assignments</h2>
    <div id="assignment_container" class="container">
        <!-- Assignment cards will be dynamically added here -->
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
    const local = 'http://localhost:8911';
    const deployed = 'https://jcc.stu.nighthawkcodingsociety.com';

    // this is method to extract the query parameter from URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function fetchClassData() {
        // starting by extracting the assignment ID from query parameter
        var classId = getParameterByName('id');
        if (classId) {
            // Fetch assignment data using the assignment ID
            fetch(`${deployed}/api/class_period/${classId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle fetched assignment data here
                    console.log('Fetched assignment data:', data);
                    document.getElementById('class_name').innerHTML = data.name;
                    document.getElementById('class_leaders').innerHTML = 'Leaders: ';
                    for (var i = 0; i < data.leaders.length; i++) {
                        document.getElementById('class_leaders').innerHTML += data.leaders[i].name;
                        if (i < (data.leaders.length - 1)) {
                            document.getElementById('class_leaders').innerHTML += ", ";
                        }
                    }
                    populateAssignmentContainer(data);
                })
                .catch(error => console.error('Error fetching class data:', error));
        }
    }

    function populateAssignmentContainer(studentData) {
        const container = document.getElementById('assignment_container');
        container.innerHTML = ''; // clear previous content
        for (var assignment of studentData.assignments) {
            var card = document.createElement('div');
            card.classList.add('card');

            var assignmentName = document.createElement('div');
            assignmentName.classList.add('main-name');
            assignmentName.textContent = assignment.name;
            
            // adding a click event listener to the assignmentName div
            assignmentName.setAttribute("onclick", "assignmentRedirect(" + String(assignment.id) + ")");

            // var className = document.createElement('div');
            // className.classList.add('second-name');
            // className.textContent = classPeriodName;

            var dueDate = document.createElement('div');
            dueDate.classList.add('third-name');
            dueDate.textContent = `Due: ${new Date(assignment.dateDue).toLocaleDateString()}`;

            card.appendChild(assignmentName);
            // card.appendChild(className);
            card.appendChild(dueDate);

            container.appendChild(card);
        }
    }

    function assignmentRedirect(id) {
        window.location.href = '{{site.baseurl}}/assignment-data?id=' + id;
    }

    window.onload = fetchClassData;
</script>