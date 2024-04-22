---
title: QR Code Generator with Backend
description: A qr code generator with backend
toc: True
layout: post
---



<div id="qrcode"></div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>

<div id="inputDiv">
</div>
<button onclick="NewInput()">new thing</button>
<button onclick="Generate()"> generate </button>

<script type="text/javascript">
    function NewInput(numb, link, freq){
        var num;
        if (numb === undefined){
            num =  $("#inputDiv").find("input").length/2 + 1;
        }
        else{
            num = numb;
        }

        var inputQR = document.createElement('input');
        inputQR.type = 'text';
        inputQR.id = `QR${num}`;
        inputQR.placeholder = "Link"
        if (link){
            inputQR.innerHTML = link;
        }

        // Create second input element
        var inputFreq = document.createElement('input');
        inputFreq.type = 'text';
        inputFreq.id = `Freq${num}`;
        inputFreq.placeholder = "Frequency"
        if (freq){
            inputQR.innerHTML = freq;
        }

        // Create button element
        var button = document.createElement('button');
        button.id = `btn${num}`;
        button.textContent = 'X'; // Set button text
        // Set onclick event for the button using an anonymous function to call Remove with 'this'
        button.onclick = function() { Remove(this); };

        // Create a line break element
        var lineBreak = document.createElement('br');

        // Assuming you have a container element to append these elements to, for example, a div with id 'container'
        var container = document.getElementById('inputDiv');

        // Append the elements to the container
        container.appendChild(inputQR);
        container.appendChild(inputFreq);
        container.appendChild(button);
        container.appendChild(lineBreak);
    }
    
    function Remove(event){
        var length = $("#inputDiv").find("input").length/2 - 1
        console.log(document.getElementById("inputDiv"));
        document.getElementById(`inputDiv`).innerHTML = "";
        for (var i = 1; i <= length; i ++){
            NewInput(i);
        }
        
    }

    function Generate(){
        console.log($("#inputDiv").find("input").length);
        if (document.getElementById("qrcode").innerHTML){
            document.getElementById("qrcode").innerHTML = "";
        }
        fetchId().then(id => {
            if(window.location.href.includes("127.0.0.1")){
                var link = "http://127.0.0.1:4100/jcc_frontend/2024/01/25/qrcodeacceptbackend.html" + id;
            }
            else {
                var link = "https://john-scc.github.io/jcc_frontend/2024/01/25/qrcodeacceptbackend.html#" + id;
            }
            console.log(link)
            new QRCode(document.getElementById("qrcode"), link)
        })
    }

    function fetchId() {
        if(window.location.href.includes("127.0.0.1")){
            var url = 'http://localhost:8911/api/qrcode/newCode';
        }
        else {
            var url = 'https://jcc.stu.nighthawkcodingsociety.com/api/qrcode/newCode';
        }

        var linkList = [];
        var freqList = [];

        for (var i = 0; i < $("#inputDiv").find("input").length/2; i ++){
            try {
                linkList.push(document.getElementById(`QR${i+1}`).value);
                freqList.push(parseFloat(document.getElementById(`Freq${i+1}`).value));
            }
            catch{
                i --;
            }
        }
        
        if(freqList.reduce((partialSum, a) => partialSum + a, 0) != 1.0){
            alert("Please ensure the sum of your frequencies is 1");
            return;
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

    for (var i = 1; i <= 2; i ++){
        NewInput(i);
    }
</script>

<script>

</script>