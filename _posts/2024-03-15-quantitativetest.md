---
layout: default
title: Quantitative Data Test
permalink: /quan-test/
---

<body>
    <h2>Enter Variable Names and Values</h2>
    <div>
        <label for="explanatoryName">Explanatory Variable Name:</label>
        <input type="text" id="explanatoryName">
        <label for="explanatoryValue">Explanatory Variable Value:</label>
        <input type="text" id="explanatoryValue">
    </div>
    <div>
        <label for="responseName">Response Variable Name:</label>
        <input type="text" id="responseName">
        <label for="responseValue">Response Variable Value:</label>
        <input type="text" id="responseValue">
    </div>
    <button onclick="sendOff()">Calculate Correlation</button>
</body>

<script>
    function sendOff() {
        var explanatoryName = document.getElementById('explanatoryName').value;
        var explanatoryValue = document.getElementById('explanatoryValue').value;
        var responseName = document.getElementById('responseName').value;
        var responseValue = document.getElementById('responseValue').value;

        var explanatoryValuesArray = explanatoryValue.split(/[,\s]+/).map(Number);
        var responseValuesArray = responseValue.split(/[,\s]+/).map(Number);

        explanatoryValuesArray = explanatoryValuesArray.map(function(value) {
            return value.toString().replace(/[, ]/g, '');
        });

        responseValuesArray = responseValuesArray.map(function(value) {
            return value.toString().replace(/[, ]/g, '');
        });

        // Create JSON object
        var data = {
            explanatoryName: explanatoryName,
            explanatoryValues: explanatoryValuesArray,
            responseName: responseName,
            responseValues: responseValuesArray
        };

        var jsonData = JSON.stringify(data, null, 2);

        console.log(jsonData);
    }