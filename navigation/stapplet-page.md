---
layout: default
title: stapplet
permalink: /stapplet/
---



<!-- DOESN'T WORK I NEED TO FIX ! :) -->
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Webpage Layout</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #1a1a1a;
        color: white;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .section-title {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .button-row {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
    .button {
        background-color: #006400;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 25px;
    }
</style>
</head>
<body>
<div class="container">
    <div class="section-title">
        <img src="" alt="Checkmark Icon" class="checkmark-icon">
        <h2>DATA ANALYSIS</h2>
    </div>
    <div class="button-row">
        <a href="#" class="button">1 CATEGORICAL VARIABLE</a>
        <a href="#" class="button">SINGLE GROUP</a>
        <a href="#" class="button">MULTI GROUP</a>
    </div>
    <div class="button-row">
        <a href="#" class="button">2 QUANTITATIVE VARIABLES</a>
    </div>
    <div class="section-title">
        <img src="" alt="Checkmark Icon" class="checkmark-icon">
        <h2>COLLABORATIVE</h2>
    </div>
    <div class="button-row">
        <a href="#" class="button">1 QUANTITATIVE VARIABLE</a>
        <a href="#" class="button">SINGLE GROUP</a>
        <a href="#" class="button">MULTI GROUP</a>
    </div>
    <div class="button-row">
        <a href="#" class="button">MULTIPLE REGRESSION</a>
    </div>
</div>
</body>
</html>
