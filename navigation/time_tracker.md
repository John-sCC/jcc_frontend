---
layout: default
title: Time Tracking Dashboard
permalink: /time-tracker/
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon-32x32.png">
  <link rel="stylesheet" href="style.css">
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap" rel="stylesheet">

  <title>Time tracking dashboard</title>
</head>
<body>
  <div class="report">
    <div class="user__report">
      <div class="user">
        <span class="label">Report for</span>
        <span class="name"></span> <!-- add stuff that connects to backend here later -->
      </div>
    </div>
    <div class="period__report">
      <ul class="period">
        <li>Daily</li>
        <li>Weekly</li>
        <li>Monthly</li>
      </ul>
    </div>
  </div>

  <div class="grid__layout">
    <!-- Study Category -->
    <div class="study__layout">
      <div class="header__layout">
      </div>

      <div class="main__content">
        <div class="category">
          <h2>Study</h2>
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
        </div>

        <div class="time__trackers">
          <div class="daily">
            <label for="studyDaily">Daily:</label>
            <input type="number" id="studyDaily" min="0" step="1">
            <button onclick="updateHours('studyDaily')">Update</button>
          </div>

          <div class="weekly">
            <p class="time__tracked">0hrs</p>
          </div>

          <div class="monthly">
            <p class="time__tracked">0hrs</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Exercise Category -->
    <div class="exercise__layout">
      <div class="header__layout">
        <img src="./images/icon-exercise.svg" alt="Icon exercise svg">
      </div>

      <div class="main__content">
        <div class="category">
          <h2>Exercise</h2>
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
        </div>

        <div class="time__trackers">
          <div class="daily">
            <label for="exerciseDaily">Daily:</label>
            <input type="number" id="exerciseDaily" min="0" step="1">
            <button onclick="updateHours('exerciseDaily')">Update</button>
          </div>

          <div class="weekly">
            <p class="time__tracked">0hrs</p>
          </div>

          <div class="monthly">
            <p class="time__tracked">0hrs</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Coding Category -->
    <div class="coding__layout">
      <div class="header__layout">
        <img src="./images/icon-coding.svg" alt="Icon coding svg">
      </div>

      <div class="main__content">
        <div class="category">
          <h2>Coding</h2>
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
        </div>

        <div class="time__trackers">
          <div class="daily">
            <label for="codingDaily">Daily:</label>
            <input type="number" id="codingDaily" min="0" step="1">
            <button onclick="updateHours('codingDaily')">Update</button>
          </div>

          <div class="weekly">
            <p class="time__tracked">0hrs</p>
          </div>

          <div class="monthly">
            <p class="time__tracked">0hrs</p>
          </div>
        </div>
      </div>
    </div>

  </div>

  <script>
// make sure to add stuff here to connect to backend later

  function updateHours(id) {
    const input = document.getElementById(id);
    const value = input.value;
    const category = id.replace(/[0-9]/g, '');

    const dailyTracker = document.querySelector(`.${category} .daily .time__tracked`);
    dailyTracker.textContent = `${value}hr`;

    const pastDays = [3, 4, 5, 6, 7, 8, 9];
    const dailyHours = parseFloat(value);

    const weeklyHours = pastDays.reduce((total, day) => {
      return total + (dailyHours * 1.5);
    }, dailyHours);

    const monthlyHours = pastDays.reduce((total, day) => {
      return total + (dailyHours * 1.2);
    }, dailyHours);

    fetch('/saveHours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        daily: dailyHours,
        weekly: weeklyHours,
        monthly: monthlyHours
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Hours saved successfully');
      } else {
        console.error('Failed to save hours');
      }
    })
    .catch(error => {
      console.error('Error saving hours:', error);
    });
  }
</script>
</body>
</html>