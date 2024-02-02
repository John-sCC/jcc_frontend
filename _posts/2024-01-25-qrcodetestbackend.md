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
    <!-- <input type="text" id="QR3"> <input type="text" id="Freq3"><br>
    <input type="text" id="QR4"> <input type="text" id="Freq4"><br> -->

</div>
<button onclick="Generate()"> generate </button>

<script type="text/javascript">

    function Generate(){
        console.log($("#inputDiv").find("input").length);
        fetchId().then(id => {
            var link = "{{ site.baseurl }}/2024/01/25/qrcodeacceptbackend.html#" + id;
            console.log(link)
            new QRCode(document.getElementById("qrcode"), link)
        })
    }

    function fetchId() {
        // Construct the URL for the POST request
        const url = 'http://localhost:8911/api/qrcode/newCode';

        var linkList = [];
        var freqList = [];

        for (var i = 0; i < $("#inputDiv").find("input").length/2; i ++){
            linkList.push(document.getElementById(`QR${i+1}`).value);
            freqList.push(parseFloat(document.getElementById(`Freq${i+1}`).value));
        }
        
        const payload = {
            links: linkList,
            frequencies: freqList
        };

        console.log(payload);
        
        return fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            return data.id;
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    }

</script>

<script>

</script>