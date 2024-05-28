---
layout: default
title: Nighthawk Resources
hide: true
---

<body class="light">
    <div class="index">
        <div class="animation-container">
            <img src="{{site.baseurl}}/images/nighthawk flying.gif" alt="Nighthawk flying" class="nighthawk">
        </div>
        <div class="split-container">
            <div class="left-side">
                <div id="brand-logo" style="display: block; margin: 0 auto;">
                    <img src="{{site.baseurl}}/images/icons/dnhs_logo.png" id="brand-logo-img" alt="Brand Logo">
                </div>
            </div>
            <div class="divider"></div>
            <div class="right-side">
                <h2>WELCOME TO</h2>
                <h1>NIGHTHAWK RESOURCES</h1>
            </div>
        </div>
        <div class="split-container">
            <div class="left-side">
                <h2>Like Canvas, but <b>BETTER</b></h2>
                <ul class="star-list">
                    <li>ANYONE can create classes and assignments!</li>
                    <li>An inbox system allowing communication between users!</li>
                    <li>AP Statistics graphing features (no more Stapplet)!</li>
                    <li>QR Code generators for AP Statistics surveys!</li>
                    <li>Image recognition for digital data sets!</li>
                    <li>Light Mode and Dark Mode!</li>
                </ul>
            </div>
            <div class="right-side">
            </div>
        </div>
    </div>
</body>
<script>
      function themeChange() {
            const DarkMode = JSON.parse(localStorage.getItem('DarkMode')) || false;
            const newDarkMode = !DarkMode;
            if (DarkMode) {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.add('light');
                document.body.classList.remove('dark');
            }
            localStorage.setItem('DarkMode', JSON.stringify(newDarkMode));
  }
</script>