---
layout: default
title: Nighthawk Resources
hide: true
---

<body class="light">
    <div class="index">
        <div class="split-container">
            <div class="left-side">
                <div id="brand-logo">
                    <img src="{{site.baseurl}}/images/icons/dnhs_logo.png" id="brand-logo-img" alt="Brand Logo">
                </div>
            </div>
            <div class="divider"></div>
            <div class="right-side"></div>
        </div>
    </div>
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