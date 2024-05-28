---
layout: default
title: Resume
permalink: /resume/
---
<body class="light">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="tab-header">
        <button class="tab-button" onclick="switchTab(event, 'page1')">Personal Info</button>
        <button class="tab-button" onclick="switchTab(event, 'page2')">Skills</button>
        <button class="tab-button" onclick="switchTab(event, 'page3')">About Me</button>
        <button class="tab-button" onclick="switchTab(event, 'page4')">Experiences</button>
        <button class="tab-button" onclick="switchTab(event, 'page5')">Education</button>
        <button class="tab-button" onclick="switchTab(event, 'page6')">Hobbies</button>
            <!-- will add more tabs later-->
    </div>
    <div class="wrapper-div">
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
    <!-- -->
       <div id="page2" class="tab-content">
            <div class="title">Skills: </div>
            <div class="instruction">
                List skills here in paragraph form! These can include abstract skills such as good management or creativity. Be sure to include a brief description of when you have displayed these skills.
            </div>
            <form id="skillsForm" class="formStyle">
                <label for="skills">Skills:</label>
                <input type="text" id="skills" name="skills"><br><br>
            </form>
        </div>
    <!-- -->
        <div id="page3" class="tab-content">
            <div class="title">About Me: </div>
            <div class="instruction">
                Give a short description of yourself. Make it personal, and include what you want people to know most about you.
            </div>
            <form id="descForm" class="formStyle">
                <label for="desc">About Me:</label>
                <input type="text" id="desc" name="desc"><br><br>
            </form>
        </div>
    <!-- -->
    <div id="page4" class="tab-content">
        <div class="title">Experiences: </div>
        <div class="instruction">
            List your past experiences related to your field.
        </div>
        <div class="instruction">
            Experience Number 1:
        </div>
            <form id="DateForm1.1" class="formStyle">
                <label for="date1.1"> Starting Year:</label>
                <input type="text" id="date1.1" name="date1.1"><br><br>
            </form>
            <form id="DateForm1.1b" class="formStyle">
                <label for="date1.1b"> Ending Year:</label>
                <input type="text" id="date1.1b" name="date1.1b"><br><br>
            </form>
            <form id="ExpTitleForm1" class="formStyle">
                <label for="title1">Experience:</label>
                <input type="text" id="title1" name="title1"><br><br>
            </form>
            <form id="ExpDescForm1" class="formStyle">
                <label for="desc1">Brief Description:</label>
                <input type="text" id="desc1" name="desc1"><br><br>
            </form>
        <div class="instruction">
            Experience Number 2:
        </div>
            <form id="DateForm1.2" class="formStyle">
                <label for="date1.2"> Starting Year:</label>
                <input type="text" id="date1.2" name="date1.2"><br><br>
            </form>
            <form id="DateForm1.2b" class="formStyle">
                <label for="date1.2b"> Ending Year:</label>
                <input type="text" id="date1.2b" name="date1.2b"><br><br>
            </form>
            <form id="ExpTitleForm2" class="formStyle">
                <label for="title2">Experience:</label>
                <input type="text" id="title2" name="title2"><br><br>
            </form>
            <form id="ExpDescForm2" class="formStyle">
                <label for="desc2">Brief Description:</label>
                <input type="text" id="desc2" name="desc2"><br><br>
            </form>
        <div class="instruction">
            Experience Number 3:
        </div>
            <form id="DateForm1.3" class="formStyle">
                <label for="date1.3"> Starting Year:</label>
                <input type="text" id="date1.3" name="date1.3"><br><br>
            </form>
            <form id="DateForm1.3b" class="formStyle">
                <label for="date1.3b"> Ending Year:</label>
                <input type="text" id="date1.3b" name="date1.3b"><br><br>
            </form>
            <form id="ExpTitleForm3" class="formStyle">
                <label for="title3">Experience:</label>
                <input type="text" id="title3" name="title3"><br><br>
            </form>
            <form id="ExpDescForm3" class="formStyle">
                <label for="desc3">Brief Description:</label>
                <input type="text" id="desc3" name="desc3"><br><br>
            </form>
        </div>
        <div id="page5" class="tab-content">
            <div class="title">Education: </div>
            <div class="instruction">
                List your past educational experiences 
            </div>
            <div class="instruction">
                Educational Experience Number 1:
            </div>
            <form id="DateForm1.4" class="formStyle">
                <label for="date1.4"> Starting Year:</label>
                <input type="text" id="date1.4" name="date1.4"><br><br>
            </form>
            <form id="DateForm1.4b" class="formStyle">
                <label for="date1.4b"> Ending Year:</label>
                <input type="text" id="date1.4b" name="date1.4b"><br><br>
            </form>
            <form id="ExpTitleForm4" class="formStyle">
                <label for="title4">Experience:</label>
                <input type="text" id="title4" name="title4"><br><br>
            </form>
            <form id="ExpDescForm4" class="formStyle">
                <label for="desc4">Brief Description:</label>
                <input type="text" id="desc4" name="desc4"><br><br>
            </form>
            <div class="instruction">
                Educational Experience Number 2:
            </div>
            <form id="DateForm1.5" class="formStyle">
                <label for="date1.5"> Starting Year:</label>
                <input type="text" id="date1.5" name="date1.5"><br><br>
            </form>
            <form id="DateForm1.5b" class="formStyle">
                <label for="date1.5b"> Ending Year:</label>
                <input type="text" id="date1.5b" name="date1.5b"><br><br>
            </form>
            <form id="ExpTitleForm5" class="formStyle">
                <label for="title5">Experience:</label>
                <input type="text" id="title5" name="title5"><br><br>
            </form>
            <form id="ExpDescForm5" class="formStyle">
                <label for="desc5">Brief Description:</label>
                <input type="text" id="desc5" name="desc5"><br><br>
            </form>
        </div>
        <div id="page6" class="tab-content">
            <div class="title">Hobbies: </div>
            <div class="instruction">
                List your hobbies!
            </div>
            <form id="hobbiesForm" class="formStyle">
                <label for="hobbies"></label>
                <input type="text" id="hobbies" name="hobbies"><br><br>
            </form>
        </div>
        <button type="button" class="bottomButtons" onclick="save()">Save Info</button>
        <button type="button" class="bottomButtons" onclick="seeResume()">See The Resume</button>
    </div>
</body>
<script src="{{site.baseurl}}/assets/js/resume.js"></script>
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
</html>
