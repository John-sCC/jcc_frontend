---
title: QR Code Generator with Backend
description: A qr code generator with backend
toc: True
layout: post
---



<div id="qrcode"></div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>

<input type="text" id="QR1"> <br>
<input type="text" id="QR2"> <br>
<button onclick="Generate()"> generate </button>

<script type="text/javascript">
    function Generate(){
        var link = "{{ site.baseurl }}/2024/01/25/qrcodeaccept.html#" + document.getElementById("QR1").value + " " + document.getElementById("QR2").value
        console.log(link)
        new QRCode(document.getElementById("qrcode"), link)
    }
</script>
    

<script>

</script>