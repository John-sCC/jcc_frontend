---
title: QR Code Generator with Backend
description: A qr code generator with backend
toc: True
layout: post
---



<div id="qrcode"></div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>

<div id="inputDiv">
    <input type="text" id="QR1"> <input type="text" id="Freq1"> <br>
    <input type="text" id="QR2"> <input type="text" id="Freq2"><br>
    <input type="text" id="QR3"> <input type="text" id="Freq3"><br>
    <input type="text" id="QR4"> <input type="text" id="Freq4"><br>

</div>
<button onclick="Generate()"> generate </button>

<script type="text/javascript">

    function Generate(){
        console.log($("#inputDiv").find("input").length);
        var link = "{{ site.baseurl }}/2024/01/25/qrcodeaccept.html#" + fetchId();
        console.log(link)
        new QRCode(document.getElementById("qrcode"), link)
    }

    function fetchId() {
    // Construct the URL for the POST request
    const url = 'http://your-backend-domain.com/newCode';

    var linkList = [];

    for (var i = 0; i < $("#inputDiv").find("input").length/2; i ++){
        linkList.add(document.getElementById(`QR${i}`));
    }
    
    const payload = {
        links: [links],
        frequencies: frequencies
    };

    // Use fetch API to send the POST request
    fetch(url, {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify(payload) // Convert the payload to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response body
    })
    .then(data => {
        console.log('Success:', data); // Handle the success response
    })
    .catch(error => {
        console.error('Error:', error); // Handle any errors
    });
}

</script>

<script>

</script>