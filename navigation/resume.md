---
layout: default
title: Resume
permalink: /resume/
---

<style>
    .wrapper-div {
        width: 80%;
        height: 80%;
        background-color: rgba(255, 255, 255, 0);
        border: 2px solid #c1b576;
        padding: 30px;
        padding-top: 10px;
        padding-left: 10%;
    }

    .formStyle {
        font-size: 13px;
        margin-bottom: 30px;
    }

    .title {
        font-size: 30px;
        margin-bottom: 40px;
    }

    .tab-content {
        display: none;
    }

    .active {
        display: block;
    }

    .instruction {
        font-size: 17px;
        margin-bottom: 30px;
    }

    .tab-header {
        margin-bottom: 20px;
    }

    .tab-button {
        margin-bottom: 30px;
        margin-left: -40px;
        margin-right: 40px;
        font-size: 15px;
        border-radius: 4px;
        background-color: #c1b576;
        width: 200px; 
        height: 30px;
        transition-duration: 0.4s;
    }

    .tab-button:hover {
        background-color: #002147ff; 
        color: white;
    }

</style>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="wrapper-div">
    <ul class="tab-header">
            <button class="tab-button" onclick="switchTab(event, 'page1')">Personal Info</button>
            <button class="tab-button" onclick="switchTab(event, 'page2')">Skills</button>
            <!-- will add more tabs later-->
    </ul>
    <div id="page1" class="tab-content active">
        <div class="title"> Personal Information </div>
            <form id="personalDetails" class="formStyle">
                <label for="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name" required><br><br>
                <label for="last-name">Last Name:</label>
                <input type="text" id="last-name" name="last-name" required><br><br>
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required><br><br>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required><br><br>
            <!--  -->
            </form>
        </div>
       <div id="page2" class="tab-content">
            <div class="instruction">
                List skills here in paragraph form! These can include abstract skills such as good management or creativity. Be sure to include a brief description of when you have displayed these skills.
            </div>
            <form id="skillsForm" class="formStyle">
                <label for="skills">Skills:</label>
                <input type="text" id="skills" name="skills"><br><br>
            </form>
        </div>
        <button type="button" onclick="save()">Save Info</button>
        <button type="button" onclick="seeResume()">See The Resume</button>
    </div>
</body>
<script>
        function switchTab(evt, tabName) {
            var i, tabContent, tabLinks;
            tabContent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = "none";
            }
            tabLinks = document.getElementsByClassName("tab-header")[0].getElementsByTagName("a");
            for (i = 0; i < tabLinks.length; i++) {
                tabLinks[i].classList.remove("active");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.classList.add("active");
        }
        //
        function save() {
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const skills = document.getElementById('skills').value;
            // 
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('phone', phone);
            localStorage.setItem('email', email);
            localStorage.setItem('address', address);
            localStorage.setItem('address', address);
            localStorage.setItem('skills', skills);
        }
        function seeResume() {
            window.open('/jcc_frontend/filledresume/', '_blank');
        }
    </script>
</html>
