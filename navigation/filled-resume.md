---
layout: default
title: Your Resume
permalink: /filledresume/
---
<style>
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}

body {
  font-size: 14px;
  line-height: 22px;
  color: #555555;
}

.bold {
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
}

.semi-bold {
  font-weight: 500;
  font-size: 16px;
}

.resume {
  width: 800px;
  height: auto;
  display: flex;
  margin: 50px auto;
}

.resume .resume_left {
  width: 280px;
  background: #002147ff;
}

.resume .resume_left .resume_profile {
  width: 100%;
  height: 280px;
}

.resume .resume_left .resume_profile img {
  width: 100%;
  height: 100%;
}

.resume .resume_left .resume_content {
  padding: 0 25px;
}

.resume .title {
  margin-bottom: 20px;
}

.resume .resume_left .bold {
  color: #fff;
}

.resume .resume_left .regular {
  color: #c1b576;
}

.resume .resume_item {
  padding: 25px 0;
  border-bottom: 2px solid #c1b576;
}

.resume .resume_left .resume_item:last-child,
.resume .resume_right .resume_item:last-child {
  border-bottom: 0px;
}

.resume .resume_left ul li {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.resume .resume_left ul li:last-child {
  margin-bottom: 0;
}

.resume .resume_left ul li .icon {
  width: 35px;
  height: 35px;
  background: #fff;
  color: #c1b576;
  border-radius: 50%;
  margin-right: 15px;
  font-size: 16px;
  position: relative;
}

.resume .icon i,
.resume .resume_right .resume_hobby ul li i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.resume .resume_left ul li .data {
  color: #c1b576;
}

.resume .resume_left .resume_skills ul li {
  display: flex;
  margin-bottom: 10px;
  color: #c1b576;
  justify-content: space-between;
  align-items: center;
}

.resume .resume_left .resume_skills ul li .skill_name {
  width: 25%;
}

.resume .resume_left .resume_skills ul li .skill_progress {
  width: 60%;
  margin: 0 5px;
  height: 5px;
  background: #009fd9;
  position: relative;
}

.resume .resume_left .resume_skills ul li .skill_per {
  width: 15%;
}

.resume .resume_left .resume_skills ul li .skill_progress span {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #fff;
}

.resume .resume_left .resume_social .semi-bold {
  color: #fff;
  margin-bottom: 3px;
}

.resume .resume_right {
  width: 520px;
  background: #fff;
  padding: 25px;
}

.resume .resume_right .bold {
  color: #002147ff;
}

.resume .resume_right .resume_work ul,
.resume .resume_right .resume_education ul {
  padding-left: 40px;
  overflow: hidden;
}

.resume .resume_right ul li {
  position: relative;
}

.resume .resume_right ul li .date {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

.resume .resume_right ul li .info {
  margin-bottom: 20px;
}

.resume .resume_right ul li:last-child .info {
  margin-bottom: 0;
}

.resume .resume_right .resume_work ul li:before,
.resume .resume_right .resume_education ul li:before {
  content: "";
  position: absolute;
  top: 5px;
  left: -25px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 2px solid #002147ff;
}

.resume .resume_right .resume_work ul li:after,
.resume .resume_right .resume_education ul li:after {
  content: "";
  position: absolute;
  top: 14px;
  left: -21px;
  width: 2px;
  height: 115px;
  background: #002147ff;
}

.resume .resume_right .resume_hobby ul {
  display: flex;
  justify-content: space-between;
}

.resume .resume_right .resume_hobby ul li {
  width: 80px;
  height: 80px;
  border: 2px solid #0bb5f4;
  border-radius: 50%;
  position: relative;
  color: #0bb5f4;
}

.resume .resume_right .resume_hobby ul li i {
  font-size: 30px;
}

.resume .resume_right .resume_hobby ul li:before {
  content: "";
  position: absolute;
  top: 40px;
  right: -52px;
  width: 50px;
  height: 2px;
  background: #0bb5f4;
}

.resume .resume_right .resume_hobby ul li:last-child:before {
  display: none;
}

</style>
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
                <p>Put a Short Description Here!</p>
            </div>
            <div class="resume_item resume_work">
                <div class="title">
                    <p class="bold">Experiences</p>
                </div>
                <ul>
                    <li>
                        <div class="date">start1 - end1</div>
                        <div class="info">
                            <p class="semi-bold">Title1</p>
                            <p>Desc1</p>
                        </div>
                    </li>
                    <li>
                        <div class="date">start2 - end2</div>
                        <div class="info">
                            <p class="semi-bold">Title2</p>
                            <p>Desc2</p>
                        </div>
                    </li>
                    <li>
                        <div class="date">start3 - end3</div>
                        <div class="info">
                            <p class="semi-bold">Title3</p>
                            <p>Desc3</p>
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
                        <div class="date">start4 - end4</div>
                        <div class="info">
                            <p class="semi-bold">class1</p>
                            <p>Desc4</p>
                        </div>
                    </li>
                    <li>
                        <div class="date">start5 - end5</div>
                        <div class="info">
                            <p class="semi-bold">Class5</p>
                            <p>Desc5</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="resume_item resume_hobby">
                <div class="title">
                    <p class="bold">Hobbies</p>
                </div>
                <div class="regular"> List hobbies here! </div>
            </div>
        </div>
    </div>
    <script>
        // Retrieve user's information from local storage
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        const phone = localStorage.getItem('phone');
        const email = localStorage.getItem('email');
        const address = localStorage.getItem('address');

        // Insert user's information into the resume template
        document.getElementById('name').innerText = `${firstName} ${lastName}`;
        document.getElementById('phone').innerText = phone;
        document.getElementById('email').innerText = email;
        document.getElementById('address').innerText = address;
    </script>
</html>