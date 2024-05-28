---
layout: default
title: stapplet
permalink: /stapplet/
---



<!-- DOESN'T WORK I NEED TO FIX ! :) -->
<!-- ```html  -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
@import url('https://fonts.googleapis.com/css2?family=Becka+Script+Plain+Regular&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Collegiate+Inside&display=swap');

body {
    font-family: "Becka Script Plain Regular", sans-serif;
    padding: 20px;
    background-color: #002147ff; 
    color: #fff; 
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; 
}

.box {
    background-color: #002147ff; 
    padding: 20px;
    border-radius: 5px;
    width: calc(50% - 40px); 
    margin-bottom: 20px;
    border: 5px solid #91976cff; 
    margin-right: 20px; 
}


.title {
    font-family: "Collegiate Inside", sans-serif;
    font-size: 36px;
    margin-bottom: 20px;
    color: #91976cff; 
}

.description {
    font-size: 24px;
    margin-bottom: 30px;
}

.tool-list {
    list-style-type: none;
    padding: 0;
}

.tool-item {
    margin-bottom: 20px;
    font-size: 20px;
}

.tool-link {
    color: #22956b; 

    &:hover {
        text-decoration: underline;
    }
    .box:last-child {
    margin-right: 0;
}

}
</style>
</head>
<body>
    <h1 class="title">Select Your Graphing Tool</h1>
    <p class="description">Please select the graphing tool you want to use for your stats data:</p>
    <div class="box">
        <h2 class="title">Categorical</h2>
        <ul class="tool-list">
            <li class="tool-item"><a href="/jcc_frontend/twocategorical/" class="tool-link">Single Categorical</a></li>
            <li class="tool-item"><a href="/jcc_frontend/twocategorical/" class="tool-link">Two Categorical</a></li>
        </ul>
    </div>
    <div class="box">
        <h2 class="title">Quantitative</h2>
        <ul class="tool-list">
            <li class="tool-item"><a href="/jcc_frontend/one-variable/" class="tool-link">One Quantitative Variable</a></li>
            <li class="tool-item"><a href="/jcc_frontend/tables/" class="tool-link">Two Quantitative Variables</a></li>
        </ul>
    </div>
</body>
</html>

