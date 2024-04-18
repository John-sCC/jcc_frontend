---
layout: default
title: Assignment Data (Test)
search_exclude: true
permalink: /assignment-data
---

<div class="assignment">
    <h1 id="assignment_name"></h1>
    <h2 id="due_date">Loading...</h2>
    <p id="content"></p>
</div>
<div id="submission_body" style="display: none;">
    <h2>File Upload</h2> 
    <input type="file" id="fileInput" style="display: none">
    <label class="label" for="fileInput" id="customButton">Choose a File</label>
    <p id="fileName"></p>
    <button class="button" id="upload" onclick="submit()">Submit Assignment</button>
</div>

<script>
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
                    document.getElementById('submission_body').style = "display: block;";
                })
                .catch(error => console.error('Error fetching assignment data:', error));
        }
    }

    window.onload = fetchAssignmentData;

    // RAYMOND CODE
    const submitFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('id', getParameterByName('id'));
        // // Get the current date and time in ISO 8601 format
        // const submissionTime = new Date().toISOString();
        // formData.append('submissionTime', submissionTime);

        // Get the current date and time in ISO 8601 format
        const submissionTime = new Date().toISOString();

        try {
            const response = await fetch(`${deployed}/assignment/submit/${getParameterByName('id')}/${submissionTime}`, {
                method: 'POST',
                body: formData,
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    // No need to set 'content-type' for FormData, apparently
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const filePath = await response.text();
            console.log('File uploaded successfully:', filePath);
            document.getElementById('fileName').innerText = `File Name: ${file.name}`;

        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    function submit() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        
        if (file) {
            submitFile(file);
        } else {
            console.error('No file selected');
        }
    }

    // Update the custom button text when a file is selected
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        document.getElementById('customButton').innerText = fileName;
    });
    </script>