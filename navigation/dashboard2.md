---
layout: default
title: Dashboard
search_exclude: true
permalink: /dashboard-test/
---
<div class="dashboard-container">
    <div class="user-classes">
        <div class="title-container">YOUR CLASSES:</div> <!-- arrgh!! -->
        <div class="class-container">
            <div class="class-row">
                <div class="class-item">
                    <div class="class-options">
                        <div class="colors-row">
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                            <div class="color-square"></div>
                        </div>
                        <div class="custom-color">
                            <div class="color-square" id="custom-color-square"></div>
                            <input id="custom-color-input" placeholder="#FFFFFF">
                        </div>
                        <div class="buttons">
                            <button id="cancel">CANCEL</button>
                            <button id="apply">APPLY</button>
                        </div>
                    </div>
                    <div class="class-buttons">
                        <img src="../images/icons/assignment-icon.png" title="Assignments">
                        <img src="../images/icons/speaker-icon.png" title="Announcements">
                        <img src="../images/icons/gradebook-icon.png" title="Grades">
                        <img src="../images/icons/ellipsis-v-icon.png" title="Options">
                    </div>
                </div>
                <div class="class-item">
                    <div class="class-name"><a>AP Balling</a></div>
                    <div class="class-buttons">
                            <img src="../images/icons/assignment-icon.png" title="Assignments">
                            <img src="../images/icons/speaker-icon.png" title="Announcements">
                            <img src="../images/icons/gradebook-icon.png" title="Grades">
                            <img src="../images/icons/ellipsis-v-icon.png" title="Options">
                    </div>
                </div>
                <div class="class-item">
                    <div class="class-name"><a>AP Balling</a></div>
                    <div class="class-buttons">
                        <img src="../images/icons/assignment-icon.png" title="Assignments">
                        <img src="../images/icons/speaker-icon.png" title="Announcements">
                        <img src="../images/icons/gradebook-icon.png" title="Grades">
                        <img src="../images/icons/ellipsis-v-icon.png" title="Options">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="spacer"></div> <!-- blank area to separate -->
    <div class="user-assignments">
        <div class="assignment-dropdown-container">TO-DO:</div>
        <div class="assignment-list-container">
            <div class="assignment-list-item">
                <div class="assignment-icon-container">
                <img src="../images/icons/white-assignment-icon.png">
                </div>
                <div class="assignment-text-container">
                    <div class="assignment-name"><a>Freaky Narrative</a></div>
                    <div class="class-name"><a>AP Gamer Gunk</a></div>
                    <div class="assignment-info">100 pts | May 14th at 11:59 PM</div>
                </div>
            </div>
            <div class="assignment-list-item">
                <div class="assignment-icon-container">
                <img src="../images/icons/white-assignment-icon.png">
                </div>
                <div class="assignment-text-container">
                    <div class="assignment-name"><a>Freaky Narrative</a></div>
                    <div class="class-name"><a>AP Gamer Gunk</a></div>
                    <div class="assignment-info">100 pts | May 14th at 11:59 PM</div>
                </div>
            </div>
            <div class="assignment-list-item">
                <div class="assignment-icon-container">
                <img src="../images/icons/white-assignment-icon.png">
                </div>
                <div class="assignment-text-container">
                    <div class="assignment-name"><a>Freaky Narrative</a></div>
                    <div class="class-name"><a>AP Gamer Gunk</a></div>
                    <div class="assignment-info">100 pts | May 14th at 11:59 PM</div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{site.baseurl}}/assets/js/dashboard-new.js"></script>