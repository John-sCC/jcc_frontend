---
title: QR Code Landing Page with backend
description: A landing page to redirect users based on the qr code
toc: True
layout: post
---


<title>Redirecting to https://github.com/users/Toby-Leeder/projects/2</title>
<!-- <meta http-equiv="refresh" content="0; URL=https://github.com/users/Toby-Leeder/projects/2/views/1?layout=board">
<link rel="canonical" href="https://github.com/users/Toby-Leeder/projects/2/views/1?layout=board"> -->
<script>
    var hash = window.location.hash.substring(1)
    console.log(hash);
    // Define the URL of your endpoint
    // const url = 'http://localhost:8911/api/qrcode/';
    const url = 'https://jcc.stu.nighthawkcodingsociety.com/api/qrcode/';
    // Use the Fetch API to send a GET request to your backend
    fetch(url)
    .then(response => {
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
        // If the response is not ok, throw an error with the status
        throw new Error('Network response was not ok, status: ' + response.status);
        }
        // If the response is ok, parse it as JSON
        return response.json();
    })
    .then(data => {
        // Log the data to the console
        console.log('Fetched QrCodes:', data);
    })
    .catch(error => {
        // Log any errors to the console
        console.error('Fetch error:', error);
    });
    // var head = document.querySelector('head')
    // var randNum = Math.floor(Math.random() * links.length)
    // var meta = document.createElement('meta')
    // meta.httpEquiv = "refresh"
    // meta.content ="0; URL=" + links[randNum];
    // var link = document.createElement('link')
    // link.rel = "canonical"
    // link.href = links[randNum]
    // head.appendChild(meta)
    // head.appendChild(link)
</script>