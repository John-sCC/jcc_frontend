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
            let date = d.getElementById("dateDue").value;
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
                return response.json();
            })
            .then(data => {
                // Handle the data here
                console.log(data);
                alert(`Assignment created successfully. ID: ${data.id}`);
            })
            .catch(error => {
                console.error('Error posting assignment:', error);
                alert('Error posting assignment. Check the console for details.');
            });
        }
    </script>
</head>
<body>
    <div class="flexbox">
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