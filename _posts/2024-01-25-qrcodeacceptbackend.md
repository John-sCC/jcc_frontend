---
title: QR Code Landing Page with backend
description: A landing page to redirect users based on the qr code
toc: True
layout: post
---


<title>Redirecting to https://github.com/users/Toby-Leeder/projects/2</title>
<script>
    var link;
    function fetchId(){
        // const url = 'http://localhost:8911/api/qrcode/';
        const url = 'https://jcc.stu.nighthawkcodingsociety.com/api/qrcode/';
        return fetch(url + window.location.hash.substring(1))
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok, status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }
    function getLink(){
        return fetchId().then(obj => {
            var num = Math.random()
            var intervals = [];
            for (var i = 0; i < obj.linkFreqs.length; i ++){
                if (i == 0){
                    intervals.push(obj.linkFreqs[i].frequency)
                }
                else {
                    intervals.push(obj.linkFreqs[i].frequency + obj.linkFreqs[i-1].frequency)
                }
            }
            for (i in intervals){
                if (num < intervals[i]){
                    link = obj.linkFreqs[i].link;
                    return link
                }
            }
        })
    }
    getLink().then(link => {
            var head = document.querySelector('head')
            var meta = document.createElement('meta')
            meta.httpEquiv = "refresh"
            meta.content ="0; URL=" + link;
            var link = document.createElement('link')
            link.rel = "canonical"
            link.href = link
            head.appendChild(meta)
            head.appendChild(link)
    })
</script>