---
layout: default
title: Ass Request
search_exclude: true
permalink: /ass-request/
---

<head>
    <style>
        .flexbox {
            display: flex;
        }
    </style>
    <script>
        function postAssignment() {
            const d = document;
            let name = d.getElementById("name").value;
            let dateDue = d.getElementById("dateDue").value;
            let content = d.getElementById("content").value;
            const currentDate = new Date();
            const dateCreated = currentDate.toISOString().slice(0, 10);
            const apiUrl = 'https://jcc.stu.nighthawkcodingsociety.com/api/assignment/post';
            // a
            const requestData = {
                name: name,
                dateCreated: dateCreated,
                dateDue: dateDue,  
                content: content
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
                    alert('Assignment created successfully. However, the server response is not in JSON format.');
                    // You might want to redirect or do something else here
                }
            })
            .catch(error => {
                console.error('Error posting assignment:', error);
                alert('Error posting assignment. Check the console for details.');
            });
        }
    </script>
</head>
<body>
    <div>
        <label>heko 
        <input type="number" name="classLeader" id="classLeader"></label>
        <button>submit your class leader id</button>
    </div>
    <div class="flexbox" style="visibility: block">
        <p><label>
            Name of Assignment: <br>
            <input type="text" name="name" id="name" required>
        </label></p>
        <p><label>
            Due Date: <br>
            <input type="date" name="dateDue" id="dateDue" required>
        </label></p>
        <p><label>
            Assignment Details:<br>
            <textarea name="content" id="content" rows="4" cols="50" required></textarea>
        </label></p>
        <button onclick="postAssignment()">button</button>
    </div>
</body>