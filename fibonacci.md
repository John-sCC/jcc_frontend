---
layout: base
title: Fibonacci Display
hide: true
---
<head>
    <link href="assets/fibonacci/fibonacci.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script href="{{site.baseurl}}/assets/fibonacci/fibonacci.js" type="text/javascript"></script>
</head>

<div class="container">
    <div class="flex-container">
        <div>
            <input class="input" placeholder="Enter nth value">
        </div>
        <div>
            <div class="button">Submit</div>
        </div>
    </div>
    <div class="other-container">
        <div class="flex-container">
            <div class="sequence">
                <div class="sequence-title">
                List:
                </div>
                <div class="sequence-container">
                </div>
            </div>
            <div class="spiral">
                <div class="spiral-title">
                Visual:
                </div>
                <div class="fibonacci-container">
                </div>
            </div>
        </div>
    </div>
</div>