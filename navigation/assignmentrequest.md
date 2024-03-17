---
layout: default
title: Ass Request
search_exclude: true
permalink: /ass-request/
---

<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        function postAssignment() {
            const d = document;
            let name = d.getElementById("name").value;
            let dateDue = d.getElementById("dateDue").value;
            let classNames = [d.getElementById("className").value];
            const currentDate = new Date();
            const dateCreated = currentDate.toISOString().slice(0, 10);
            var formattedText = $('#content').html();
            //const apiUrl = 'https://jcc.stu.nighthawkcodingsociety.com/api/assignment/post';
            const apiUrl = 'http://localhost:8911/api/assignment/post';
            // a
            const requestData = {
                name: name,
                dateCreated: dateCreated,
                dateDue: dateDue,  
                content: formattedText,
                classNames: classNames
            };
            console.log(requestData);
            //a
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Check if the response is JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    // If the response is not JSON, return the text directly
                    return response.text();
                }
            })
            .then(data => {
                // Handle the data here
                if (typeof data === 'object') {
                    // If it's JSON, proceed as before
                    console.log(data);
                    alert(`Assignment created successfully. ID: ${data.id}`);
                    window.location.href = `{{site.baseurl}}/assignment-data?id=${data.id}`;
                } else {
                    // If it's not JSON, handle it as per your requirement
                    console.log(data);
                    window.location.href = `{{site.baseurl}}/assignment-data?id=${data.id}`;
                }
            })
            .catch(error => {
                console.error('Error posting assignment:', error);
                alert('Error posting assignment. Check the console for details.');
            });
        }
        // filler
        function getClassPeriodById() {
        const apiUrl = 'http://localhost:8911/api/class_period/leaders/' + document.getElementById("classLeader").value;
        //const apiUrl = 'https://jcc.stu.nighthawkcodingsociety.com/api/class_period/leaders/' + document.getElementById("classLeader").value;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                // Handle the data here
                console.log(data);
                for (var classs of data) {
                    console.log(classs);
                    console.log(classs.name);   
                    document.getElementById("className").style.visibility = "visible";
                    document.getElementById("InputClassLeader").style.display = "none";
                    document.getElementById("bigblockthatcontainsacuatalassignmentstuff").style.visibility = "visible";
                    document.getElementById("labelthatwontshow").style.visibility = "visible";
                    var option = document.createElement("option");
                    option.value = classs.name;
                    option.innerHTML = classs.name;
                    document.getElementById("className").appendChild(option);
                }
            })  
            .catch(error => {
                console.error('Error fetching class period:', error);
                alert('Error fetching class period. Check the console for details.');
            });
    }
    function formatText(command) {
      document.execCommand(command);
    }
    </script>
</head>
<body>
    <div id="InputClassLeader" style="display: block">    
        <label class="lable">Input your class leader ID:  
        <input type="number" name="classLeader" id="classLeader" class="inphutbox"></label>
        <button onclick="getClassPeriodById()" class="lable">submit</button>
    </div>
    <div id="divForClass"> <label id="labelthatwontshow" class="lable">Class to create an assignment for:</label> <select name="className" id="className" class="inphutbox"></select> </div>
    <div class="flexbox" id="bigblockthatcontainsacuatalassignmentstuff" style="visibility: hidden; font-family: Lexend, sans-serif;">
        <div class="insideFlexbox">
            <p><label class="lable">
                Name of Assignment: <br>
                <input class="inphutbox" type="text" name="name" id="name" size="50" required>
            </label></p>
            <p><label class="lable">
                Due Date: <br>
                <input class="inphutbox" type="date" name="dateDue" id="dateDue" required>
            </label></p>
        </div>
        <div class="insideFlexbox">
            <p><label class="lable">
                Assignment Details:<br>
                <div id="formatting-options">
                    <button onclick="formatText('bold')">Bold</button>
                    <button onclick="formatText('italic')">Italic</button>
                    <button onclick="formatText('underline')">Underline</button>
                    <!-- Add more formatting options as needed -->
                </div>
                <textarea class="biginphutbox" name="content" id="content" rows="16" cols="125" required></textarea>
            </label></p>
            <button onclick="postAssignment()" class="button">Submit Assignment</button>
        </div>
    </div>
</body>