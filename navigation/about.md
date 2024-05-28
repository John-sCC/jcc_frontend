---
layout: default
title: About Us
permalink: /about/
---
<body class="light">
The beginnings of a grand adventure🧗‍♂️...
</body>
<script>
function themeChange() {
            const DarkMode = JSON.parse(localStorage.getItem('DarkMode')) || false;
            const newDarkMode = !DarkMode;
            if (DarkMode) {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.add('light');
                document.body.classList.remove('dark');
            }
            localStorage.setItem('DarkMode', JSON.stringify(newDarkMode));
}
</script>

