---
title: 'Frontend: Student QR Code Program'
layout: post
description : Automatically Populated Github Issue
---

### Planning

We plan to use qrcode.js for this feature. It will connect to the backend. We have yet to UML the process.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code Generator</title>
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
</head>
<body>
    <div id="qrcode"></div>

    <script>
        // Function to generate QR code from a link
        function generateQRCode(link) {
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: link,
                width: 128,
                height: 128
            });
        }

        // Call the function with your link
        generateQRCode("https://example.com");
    </script>
</body>
</html>
```

Customize the width and height properties in the QRCode constructor to adjust the size of the generated QR code.

You can style the #qrcode div to adjust the appearance of the QR code.

This example uses the qrcode.js library, which is a lightweight and easy-to-use solution for generating QR codes on the client side. Make sure to check the licensing terms of the library if you plan to use it in a commercial project.

