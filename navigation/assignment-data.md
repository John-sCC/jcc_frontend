---
layout: default
title: Assignment Data (Test)
search_exclude: true
permalink: /assignment-data
---

<div class="assignment" id="assignment_body" style="display: none;">
    <h1 id="assignment_name">...</h1>
    <div class="data-box" id="data_box"></div>
    <div class="split-container">
        <div class="left-side">
            <p id="content"></p>
        </div>
        <div class="divider"></div>
        <div class="right-side">
            <div class="container">
                <div class="header">Header</div>
                <div class="upload-title">File Upload</div>
                <input type="file" id="fileInput" class="file-upload">
                <div class="placeholder">Placeholder</div>
                <button class="submit-btn" onclick="submit()">Submit</button>
            </div>
            <div class="container">
                <div class="header">Preview</div>
                <button class="getPreview" onclick="preview()">Preview</button>
                <div id="submissionid"></div>
                <div id="name"></div>
                <div id="filepath"></div>
                <div id="timesubmitted"></div>
                <div id="submissionnumber"></div>
                <div id="filePreview"></div>
            </div>
        </div>
    </div>
</div>

<script>
    var local = "http://localhost:8911";
    var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
    const currentUrl = window.location.href;
    var fetchUrl = deployed;
    if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
        fetchUrl = local;
    }

    // variables for dates
    let dateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    let timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

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
            fetch(`${fetchUrl}/api/assignment/cookie/${assignmentId}`, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    // No need to set anything here
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle fetched assignment data here
                    var assignmentData = data.data;
                    console.log('Fetched assignment data from ' + assignmentData.name + ':', data);
                    document.getElementById('assignment_name').innerHTML = assignmentData.name;
                    var assignmentDate = new Date(assignmentData.dateDue);
                    // chatGPT helped with this one!!
                    let formattedDate = dateFormatter.format(assignmentDate);
                    let formattedTime = timeFormatter.format(assignmentDate);
                    let formattedDateTime = `${formattedDate} (${formattedTime})`;
                    const dataBox = document.getElementById('data_box');
                    // populating the data box with flex items
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`Due: ${formattedDateTime}`}));
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'divider', textContent:` | `}));
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`Points: ${assignmentData.points}`}));
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'divider', textContent:` | `}));
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`Allowed Files: ${assignmentData.allowedFileTypes.map(str => str.toUpperCase()).join(', ')}`}));
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'divider', textContent:` | `}));
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`Submissions: ${assignmentData.submissions.length}/${assignmentData.allowedSubmissions}`}));
                    document.getElementById('content').innerHTML = assignmentData.content;
                    document.getElementById('assignment_body').style = "display: block;";
                })
                .catch(error => console.error('Error fetching assignment data:', error));
        }
    }

    window.onload = fetchAssignmentData;

    function preview() {
        var assignmentID = getParameterByName('id');
        console.log(assignmentID);

        if (assignmentID) {
            fetch(`${fetchUrl}/api/assignment/previewCheck?id=${assignmentID}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                
                headers: {
                    // Add any necessary headers here
                    'Content-Type': 'application/json',

                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Do not have access to view this assignment or assignment does not exist');
                }
                return response.text(); // Assuming the response is plain text
            })
            .then(data => {
                console.log('Fetched preview data:', data);
                // Optionally, you can display the data on the page
                const lines = data.split('\n');
                console.log(lines[0]);
                console.log(lines[1]);
                console.log(lines[2]);
                console.log(lines[3]);
                console.log(lines[4]);
                document.getElementById('submissionid').innerText = lines[0];
                document.getElementById('name').innerText = lines[1];
                const submitterString = lines[1];
                const submitterName = submitterString.split(":")[1].trim();
                document.getElementById('filepath').innerText = lines[2];
                document.getElementById('timesubmitted').innerText = lines[3];
                document.getElementById('submissionnumber').innerText = lines[4];
                fetch(`${fetchUrl}/api/assignment/showFilePreview?id=${assignmentID}&submitter=${submitterName}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'include',
                    headers: {
                        // Add any necessary headers here
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch file preview');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const fileUrl = URL.createObjectURL(blob);

                    // Assuming you have a div with id 'filePreviewDiv' where you want to display the file
                    var filePreviewDiv = document.getElementById('filePreview');

                    // Clear previous content of the div, if any
                    filePreviewDiv.innerHTML = '';

                    // Create appropriate element based on file type
                    const fileType = blob.type;
                    if (fileType.startsWith('image/')) {
                        // For images, display using img tag
                        const img = document.createElement('img');
                        img.src = fileUrl;
                        filePreviewDiv.appendChild(img);
                    } else if (fileType === 'application/pdf') {
                        // For PDF files, display using iframe
                        const iframe = document.createElement('iframe');
                        iframe.src = fileUrl;
                        iframe.width = '100%';
                        iframe.height = '600px'; // Adjust height as needed
                        filePreviewDiv.appendChild(iframe);
                    } else {
                        // For other file types, provide a download link
                        const downloadLink = document.createElement('a');
                        downloadLink.href = fileUrl;
                        downloadLink.textContent = 'Download File';
                        filePreviewDiv.appendChild(downloadLink);
                    }
                })
                .catch(error => console.error('Error fetching file preview:', error));

            })
        }
    }

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
            const response = await fetch(`${fetchUrl}/api/assignment/submit/${getParameterByName('id')}/${submissionTime}`, {
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
