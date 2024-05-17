---
title: 'Tracker for time spent working'
layout: post
description : Automatically Populated Github Issue
---

## Time Tracking Dashboard

Users will be able to input the time that they spend studying, coding, or exercising for each day as well as the total number of hours they spent performing those activities in the past week and month. 

_**Note: only frontend is currently finished**_

###### Example code for exercise category:
```html
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
```

###### Example code for calculating total hours:
```js
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
```

