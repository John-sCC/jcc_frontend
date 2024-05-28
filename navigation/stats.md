---
layout: default
title: Statistics
toc: false
permalink: /stats
---
<body class="light">
<div class="options">
  <div>
    <button class="stats-dropdown" onclick="toggleDropdown()">Data Analysis</button>
    <div class="dropdown-content" id="statsDropdown">
        <p>Probablility</p>
        <p>Concepts</p>
        <p>Activities</p>
    </div>
  </div>
  <button class="button">Collaborate</button>
</div>
<div class="stats">
    <h1><div class="stats-container">1 Categorical Variable</div></h1>
    <h1><div class="stats-container">2 Categorical Variables</div></h1>
    <h1><div class="stats-container">1 Quantitative Variable</div></h1>
    <h1><div class="stats-container">2 Quantitative Variables</div></h1>
    <h1><div class="stats-container">Multiple Regression</div></h1>
    <h1><div class="stats-container"><button class="button single-group">Single Group</button><button class="button multi-group">Multi Groups</button></div></h1>
</div>
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
function toggleDropdown() {
  var dropdown = document.getElementById("statsDropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
  }
  window.onclick = function(event) {
    if (!event.target.matches('.stats-dropdown')) {
      var dropdown = document.getElementById("statsDropdown");
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      }
    }
  }
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
    });
  });
  const singleGroupBtn = document.querySelector('.single-group');
  const multiGroupBtn = document.querySelector('.multi-group');
  singleGroupBtn.addEventListener('click', toggleActive);
  multiGroupBtn.addEventListener('click', toggleActive);
  function toggleActive(event) {
    singleGroupBtn.classList.remove('active');
    multiGroupBtn.classList.remove('active');
    event.currentTarget.classList.add('active');
  }
</script>
