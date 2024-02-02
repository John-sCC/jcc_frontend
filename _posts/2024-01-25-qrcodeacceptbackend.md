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
    links = hash.split("%20");
    console.log(links);
    var head = document.querySelector('head')
    var randNum = Math.floor(Math.random() * links.length)
    var meta = document.createElement('meta')
    meta.httpEquiv = "refresh"
    meta.content ="0; URL=" + links[randNum];
    var link = document.createElement('link')
    link.rel = "canonical"
    link.href = links[randNum]
    head.appendChild(meta)
    head.appendChild(link)
</script>