---
layout: default
title: Your Resume
permalink: /filledresume/
---

<body class="light">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
</head>
<div class="resume">
        <div class="resume_left">
            <div class="resume_content">
                <div class="resume_item resume_info">
                    <div class="title">
                        <p class="bold" id="name">Name here</p>
                        <p class="regular">High School Student</p>
                    </div>
                    <ul>
                        <li>
                            <div class="data" id="address">Address here</div>
                        </li>
                        <li>
                            <div class="data" id="phone">Phone number here</div>
                        </li>
                        <li>
                            <div class="data" id="email">Email here</div>
                        </li>
                    </ul>
                </div>
                <div class="resume_item resume_skills">
                    <div class="title">
                        <p class="bold">Skills</p>
                    </div>
                    <div class="regular" id="skills">List skills here</div>
                </div>
            </div>
        </div>
        <div class="resume_right">
            <div class="resume_item resume_about">
                <div class="title">
                    <p class="bold">About Me</p>
                </div>
                <p id="personaldesc" class="info_2">Put a Short Description Here!</p>
            </div>
            <div class="resume_item resume_work">
                <div class="title">
                    <p class="bold">Experiences</p>
                </div>
                <ul>
                    <li>
                        <div class="date"><span id="date1_1"></span> - <span id="date1_1b"></span></div>
                        <div class="info">
                            <p class="semi-bold" id="title1"></p>
                            <p id="desc1"></p>
                        </div>
                    </li>
                    <li>
                        <div class="date"><span id="date1_2"></span> - <span id="date1_2b"></span></div>
                        <div class="info">
                            <p class="semi-bold" id="title2"></p>
                            <p id="desc2"></p>
                        </div>
                    </li>
                    <li>
                        <div class="date"><span id="date1_3"></span> - <span id="date1_3b"></span></div>
                        <div class="info">
                            <p class="semi-bold" id="title3"></p>
                            <p id="desc3"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="resume_item resume_education">
                <div class="title">
                    <p class="bold">Education/Classes Taken</p>
                </div>
                <ul>
                    <li>
                        <div class="date"><span id="date1_4"></span> - <span id="date1_4b"></span></div>
                        <div class="info">
                            <p class="semi-bold" id="title4"></p>
                            <p id="desc4"></p>
                        </div>
                    </li>
                    <li>
                        <div class="date"><span id="date1_5"></span> - <span id="date1_5b"></span></div>
                        <div class="info">
                            <p class="semi-bold" id="title5"></p>
                            <p id="desc5"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="resume_item resume_about">
                <div class="title">
                    <p class="bold">Hobbies</p>
                </div>
                <div class="info_2" id="hobbies"></div>
            </div>
        </div>
    </div>
<script src="{{site.baseurl}}/assets/js/filled-resume.js"></script>
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