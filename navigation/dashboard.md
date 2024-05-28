---
layout: default
title: Dashboard
search_exclude: true
permalink: /dashboard/
---
<div class="dashboard-container">
    <div class="user-classes">
        <div class="title-container">YOUR CLASSES:</div> <!-- arrgh!! -->
        <div class="class-container">
            <div class="class-row">
            </div>
        </div>
    </div>
    <div class="spacer"></div> <!-- blank area to separate -->
    <div class="user-assignments">
        <div class="assignment-dropdown-container">TO-DO:</div>
        <div class="assignment-list-container">
        </div>
    </div>
</div>
<button onclick = "window.location.href = {{site.baseurl}}/class-create">Create a class!</button>

<script src="{{site.baseurl}}/assets/js/dashboard.js"></script>
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