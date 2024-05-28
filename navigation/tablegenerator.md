---
layout: default
title: Table Generator
description: make tables for ya classessssss
toc: false
permalink: /tablegenerator
---
<body class="light">
<div class="table-generator">
    <div class="text-container">
        <div class="text">
            <b>STUDENTS:</b>
            <i>SELECT A CLASS TO GENERATE FROM</i>
        </div>
        <div class="list">
            <div class="add">+</div>
        </div>
        <div class="group-numbers">
            <span># OF GROUPS:</span>
            <input id="groupsInput" placeholder="#">
        </div>
        <div class="button-container">
            <button id="submit">GENERATE TEAMS</button>
        </div>
    </div>
    <div class="table-container" id="table-div"></div>
</div>

<script src="{{site.baseurl}}/assets/js/tablegenerator.js"></script>
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
