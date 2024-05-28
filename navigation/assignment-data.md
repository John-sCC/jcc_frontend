---
layout: default
title: Assignment Data (Test)
search_exclude: true
permalink: /assignment-data
---

<body class="light">
<div class="assignment" id="assignment_body" style="display: none;">
    <h1 id="assignment_name">...</h1>
    <div class="data-box" id="data_box"></div>
    <div class="split-container">
        <div class="left-side">
            <p id="content"></p>
            <div class="container" id="file_preview_container" style="display: none;">
                <div class="header" style="margin-bottom: 10px;">PREVIEW</div>
                <div id="filePreview"></div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="right-side">
            <div id="student_display" class="container" style="display: none;">
                <div class="header">SUBMIT ASSIGNMENT</div>
                <div class="upload-title">File Upload</div>
                <input type="file" id="fileInput" class="file-upload">
                <div class="placeholder" id="file_check">Due to storage limitations, submissions must not exceed 1 megabyte (MB).</div>
                <button class="submit-btn" onclick="submit()">SUBMIT</button>
                <div id="submissions_for_preview" class="underline-pointer-hover" style="display: none;">
                    <div class="upload-title" style="margin-bottom:10px;">Your Submissions</div>
                    <ol id="submission_list"></ol>
                    <button id="close_preview_button_student" class="submit-btn" onclick="closePreview()" style="display: none;">CLOSE PREVIEW</button>
                </div>
            </div>
            <div id="teacher_display" class="container" style="display: none;">
                <div class="header" style="margin-bottom: 10px;">SUBMISSIONS</div>
                <div id="teacher_submissions" class="full-submission-list" style="display: none;">
                    <ul id="full_submission_list"></ul>
                    <button id="close_preview_button_teacher" class="submit-btn" onclick="closePreview()" style="display: none;">CLOSE PREVIEW</button>
                </div>
            </div>
        </div>
    </div>
</div>
<br>
</body>

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

    // global variable for file upload validity check
    const validFileTypes = [];

    // preview method that gets used
    function itsPreviewingTime(submissionId) {
        fetch(`${fetchUrl}/api/assignment/preview?id=${submissionId}`, {
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
            document.getElementById('content').style = "display: none;";
            document.getElementById('file_preview_container').style = "display: block;";
            document.getElementById("close_preview_button_student").style = "display: block;";
            document.getElementById("close_preview_button_teacher").style = "display: block;";
        })
        .catch(error => console.error('Error fetching file preview:', error));
    }

    function closePreview() {
        document.getElementById('content').style = "display: block;";
        document.getElementById('file_preview_container').style = "display: none;";
        document.getElementById("close_preview_button_student").style = "display: none;";
        document.getElementById("close_preview_button_teacher").style = "display: none;";
        document.querySelectorAll('.submission-item').forEach(function(element) {
            element.classList.remove('clicked'); // removing click for every other item
            // removing any existing input and button elements
            const existingInput = element.parentElement.querySelector('input');
            const existingButton = element.parentElement.querySelector('button');
            if (existingInput) {
                existingInput.remove();
            }
            if (existingButton) {
                existingButton.remove();
            }
        });
    }

    // used to build the frontend info for the assignment
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

                // identifying valid file types
                for (var i = 0; i < assignmentData.allowedFileTypes.length; i++) {
                    validFileTypes.push(assignmentData.allowedFileTypes[i]);
                }

                // chatGPT helped with this one!!
                let formattedDate = dateFormatter.format(assignmentDate);
                let formattedTime = timeFormatter.format(assignmentDate);
                let formattedDateTime = `${formattedDate} (${formattedTime})`;
                const dataBox = document.getElementById('data_box');

                // populating the data box with flex items
                dataBox.innerHTML = "";
                dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`DUE: ${formattedDateTime}`}));
                dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'divider', textContent:` | `}));
                dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`POINTS: ${assignmentData.points}`}));
                dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'divider', textContent:` | `}));
                dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`ALLOWED FILES: ${assignmentData.allowedFileTypes.map(str => str.toUpperCase()).join(', ')}`}));
                dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'divider', textContent:` | `}));
                if (data.role == "teacher") {
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`SUBMISSIONS: ${assignmentData.allSubmitters.length}/${assignmentData.allAssignees.length}`}));
                } else {
                    dataBox.appendChild(Object.assign(document.createElement('div'), {className: 'data-item', textContent:`SUBMISSIONS: ${data.submissions.length}/${assignmentData.allowedSubmissions}`}));
                }
                document.getElementById('content').innerHTML = assignmentData.content;

                // populating student's own submissions, if applicable
                if (data.role == "student") {
                    if (data.submissions.length > 0) {
                        populateSubmissionsForStudent(data.submissions, assignmentData.points);
                    }
                    document.getElementById("student_display").style = "display: block;";
                } else if (data.role = "teacher") {
                    populateSubmissionsForTeacher(assignmentData);
                    document.getElementById("teacher_display").style = "display: block;";
                }

                // displaying information once it has been properly processed
                document.getElementById('assignment_body').style = "display: block;";
            })
            .catch(error => console.error('Error fetching assignment data:', error));
        }
    }

    function populateSubmissionsForTeacher(data) {
        const submissionList = document.getElementById("full_submission_list");
        submissionList.innerHTML = "";
        for (var i = 0; i < data.allAssignees.length; i++) {
            // determining if submitted
            var submitted = false;
            // creating framework for each user's submissions
            var submitterName = document.createElement("li");
            submitterName.innerHTML = data.allAssignees[i].name;
            for (var submitter of data.allSubmitters) {
                if (submitter.email == data.allAssignees[i].email) {
                    submitted = true;
                }
            }
            if (!(submitted)) {
                submitterName.innerHTML += " (No Submission)";
            }
            submissionList.appendChild(submitterName);
            var submissionOrderedList = document.createElement("ol");
            const dueDate = new Date(data.dateDue);
            // iterating to find a student's submissions
            for (var submission of data.submissions) {
                if (submission.submitter.email == data.allAssignees[i].email) {
                    // text is what can be clicked
                    submitted = true;
                    // building element variables
                    var submissionListItem = document.createElement("li");
                    var submissionId = submission.id;
                    submissionListItem.id = String(submissionId);
                    submissionListItem.setAttribute('class', 'inline-elements');
                    var submissionText = document.createElement("span");
                    submissionText.setAttribute('class', 'submission-item');
                    var submissionTimeSub = new Date(submission.timeSubmitted);
                    var formattedSubDateTime = `${dateFormatter.format(submissionTimeSub)} (${timeFormatter.format(submissionTimeSub)})`;
                    var lateText = "";
                    if (submissionTimeSub > dueDate) {
                        lateText += "(late)";
                    }
                    var grade = "(Not graded)";
                    if (submission.score >= 0) {
                        grade = `(${submission.score}/${data.points})`;
                    }

                    submissionText.innerHTML = `${formattedSubDateTime} ${lateText} ${grade}`;

                    // clicking for preview, event listener
                    submissionText.addEventListener("click", function() {
                        // when clicked, the link will bring up the preview
                        document.querySelectorAll('.submission-item').forEach(function(element) {
                            element.classList.remove('clicked'); // removing click for every other item
                            // removing any existing input and button elements
                            const existingInput = element.parentElement.querySelector('input');
                            const existingButton = element.parentElement.querySelector('button');
                            if (existingInput) {
                                existingInput.remove();
                            }
                            if (existingButton) {
                                existingButton.remove();
                            }
                        });

                        this.classList.add('clicked'); // making this one clicked, color stays

                        // create input element
                        const input = document.createElement('input');
                        input.type = 'number';
                        input.placeholder = '...';

                        // create button element
                        const button = document.createElement('button');
                        button.textContent = 'Submit';
                        button.onclick = function() {
                            console.log(this.parentElement.id);
                            submitGrade(Number(this.parentElement.id), input.value);
                        };

                        // Append the input and button to the clicked element's container
                        this.parentElement.appendChild(input);
                        this.parentElement.appendChild(button);
                    });

                    // adding onclick for preview and then adding to other parent elements
                    submissionText.setAttribute('onclick', `itsPreviewingTime(${submissionId})`);
                    submissionListItem.appendChild(submissionText);
                    submissionOrderedList.appendChild(submissionListItem);
                }
            }
            submitterName.appendChild(submissionOrderedList);
            document.getElementById("teacher_submissions").style = "display: block;";
        }
    }

    function submitGrade(submissionId, score) {
        // making grading request
        fetch(`${fetchUrl}/api/assignment/cookie/${submissionId}/grading?score=${score}`, {
            method: 'POST',
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
            fetchAssignmentData();
            return;
        })
        .catch(error => console.error('Error grading submission:', error));
    }

    function populateSubmissionsForStudent(submissions, points) {
        const submissionList = document.getElementById("submission_list");
        submissionList.innerHTML = "";
        for (var i = 0; i < submissions.length; i++) {
            var submissionListItem = document.createElement("li");
            var submissionItem = document.createElement("span");
            submissionItem.setAttribute('class', 'submission-item');
            const submissionTimeSub = new Date(submissions[i].timeSubmitted);
            var formattedSubDateTime = `${dateFormatter.format(submissionTimeSub)} (${timeFormatter.format(submissionTimeSub)})`;
            var late = false;
            var grade = "(not graded)";
            if (submissions[i].score >= 0) {
                grade = `(${submissions[i].score}/${points})`;
            }
            submissionItem.innerHTML = `${formattedSubDateTime} ${grade}`;
            var submissionId = submissions[i].id;
            submissionItem.addEventListener("click", function() {
                // when clicked, the link will bring up the preview
                document.querySelectorAll('.submission-item').forEach(function(element) {
                    element.classList.remove('clicked'); // removing click for every other item
                });
                this.classList.add('clicked'); // making this one clicked, color stays
            });
            submissionItem.setAttribute('onclick', `itsPreviewingTime(${submissionId})`);
            submissionListItem.appendChild(submissionItem);
            submissionList.appendChild(submissionListItem);
        }
        document.getElementById("submissions_for_preview").style = "display: block;";
    }

    // WHEN THE PAGE LOADS, ASSIGNMENT DATA IS FETCHED
    window.onload = fetchAssignmentData;

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];

        if (file) {
            const fileType = file.type;
            const fileTypeParts = fileType.split('/');
            var subtype = fileTypeParts[1];
            if (subtype == "vnd.openxmlformats-officedocument.wordprocessingml.document") {
                subtype = "docx";
            }

            if (validFileTypes.includes(subtype)) {
                document.getElementById('file_check').innerHTML = "This file is valid to submit!";
            } else {
                document.getElementById('file_check').innerHTML = `Uh oh! This file is invalid. (Type: .${subtype})`;
            }
        }
    });

    function preview2() {
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
            // NOW THAT IT'S SUCCESSFUL, HAVE IT RELOAD THE FRONTEND ELEMENTS WITH THAT INITIAL METHOD
            fetchAssignmentData();
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
</script>
