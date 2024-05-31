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
        <br>
        <div class="split-container">
            <div class="left-side">
                <h2>Like Canvas, but <b>BETTER</b></h2>
                <ul class="star-list">
                    <li>ANYONE can create classes and assignments!</li>
                    <li>An inbox system allowing communication between users!</li>
                    <li><a href="{{site.baseurl}}/stapplet/">AP Statistics graphing features</a> (no more Stapplet)!</li>
                    <li>Additional stats features that Stapplet doesn't have! (Probability visualization, sharing graphs)</li>
                    <li>QR Code generators for AP Statistics surveys!</li>
                    <li>Image recognition for digital data sets!</li>
                    <li>Text Editor and AI Detection!</li>
                    <li>Light Mode and Dark Mode!</li>
                    <li><a href="{{site.baseurl}}/tablegenerator">Random table generator</a></li>
                </ul>
            </div>
            <div class="right-side" style="padding-bottom: 0px;">
                <img src="{{site.baseurl}}/images/nighthawk grin.gif" alt="Nighthawk grinning" class="nighthawk2">
            </div>
        </div>
    </div>
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
</script>