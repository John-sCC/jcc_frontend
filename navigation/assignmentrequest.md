---
layout: default
title: Ass Request
search_exclude: true
permalink: /ass-request/
---

<head>
    <style>
        .flexbox {
            display: flex;
        }
    </style>
</head>
<body>
    <form class="flexbox">
        <p><label>
            Name of Assignment: <br>
            <input type="text" name="name" id="name" required>
        </label></p>
        <p><label>
            Due Date: <br>
            <input type="date" name="dateDue" id="dateDue" required>
        </label></p>
        <p><label>
            Assignment Details:<br>
            <textarea name="content" id="content" rows="4" cols="50" required></textarea>
        </label></p>
    </form>
</body>