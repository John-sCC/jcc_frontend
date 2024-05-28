---
layout: default
title: Assignment Data (Test)
search_exclude: true
permalink: /assignment-data
---
<body class= "light">
<div class="assignment">
    <h1 id="assignment_name"></h1>
    <h2 id="due_date">Loading...</h2>
    <p id="content"></p>
</div>
</body>

<script>
  function themeChange() {
            const DarkMode = JSON.parse(localStorage.getItem('DarkMode')) || false;
            const newDarkMode = !DarkMode;
            if (DarkMode) {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.add('light');
                document.body.classList.remove('dark');
            }
            localStorage.setItem('DarkMode', JSON.stringify(newDarkMode));
  }

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

    function fetchAssignmentData() {
        // starting by extracting the assignment ID from query parameter
        var assignmentId = getParameterByName('id');
        if (assignmentId) {
            // Fetch assignment data using the assignment ID
            fetch(`${deployed}/api/assignment/${assignmentId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle fetched assignment data here
                    console.log('Fetched assignment data:', data);
                    document.getElementById('assignment_name').innerHTML = data.name;
                    document.getElementById('due_date').innerHTML = `Due: ${new Date(data.dateDue).toLocaleString()}`;
                    document.getElementById('content').innerHTML = data.content;
                })
                .catch(error => console.error('Error fetching assignment data:', error));
        }
    }

    window.onload = fetchAssignmentData;
</script>