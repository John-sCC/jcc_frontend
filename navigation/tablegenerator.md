---
layout: default
title: Table Generator
description: make tables for ya classessssss
toc: false
permalink: /tablegenerator
---
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
<input placeholder="user id" id="uid-input">
<button id="uid-submit" onclick="getUid()">enter</button>
<script src="{{site.baseurl}}/assets/js/tablegenerator.js"></script>
