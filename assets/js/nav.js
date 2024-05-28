// Wait for HTML elements to load
$(window).ready(function() {
    // Redirect buttons to respective pages
    for (let link of ["dashboard", "sign-in", "blogs", "about"]) {
        $(`#${link}`).click( function() { 
            location.href = `${baseurl}/${link}`
        })
    }

    let DarkMode = localStorage.getItem('DarkMode');
    if (DarkMode === null) {
      console.log("not there");
      DarkMode = false;
      localStorage.setItem('DarkMode', JSON.stringify(DarkMode));
    } else {
      // Convert the retrieved value from string to boolean
      DarkMode = JSON.parse(DarkMode);
    }
    

    console.log("m" + DarkMode);

    const body = document.getElementsByTagName("body")[0]

    if (DarkMode) {
        body.className = "dark"
    }
    else {
        body.className = 'light'
    }
    //Redirect logo and title clicks to index
    // for (let home of ['nav-logo', 'nav-title']) {
    //     $(`.${home}`).click( function() { 
    //         location.href = `${baseurl}/`
    //     })
    // }

    window.onscroll = function () { updateDivs() }

    // Simulate a scroll event to update on refresh
    window.dispatchEvent(new Event("scroll"));
})

// Function serves three purposes:
    // Appropriately set margin-left for the button to make space for the logo
    // Resize the logo to fit into the bottom
    // Add and remove the sticky class
function updateDivs() {
    // Calculate 1/6th of the header, as it is divided into segments of 1-4-1 (top-middle-bottom)
    const base = ((window.innerWidth * .3) / 6) ;

    // Define the farthest left button to move for logo
    const dashboardButton = $("#dashboard")[0];

    // Define the logo
    const logo = $(".nav-logo")[0];

    // Define the bottom segment
    var navBottom = $(".nav-bottom")[0];

    // Define the top segment
    var navTop = $(".nav-top")[0];

    // Position absolute if not scrolled to prevent scrolling past div
    if (window.pageYOffset > 0) {
        navTop.classList.add("sticky-top");
    }

    else {
        navTop.classList.remove("sticky-top");
    }

    // Upon scrolling past the middle section,
    if (window.pageYOffset < 4 * base) {
        // Remove sticky class from header
        navBottom.classList.remove("sticky");

        if (window.pageYOffset >= (base * 2.5)) {
            // Calculate percentage from initial to final position based on scroll
                // I could not explain this to you, it's gibberish.
            const percent =  (window.pageYOffset - (base * 2.5)) / (base * 1.5);

            // Move button with margin left based on how far scrolled to animate
            dashboardButton.style.marginLeft = `${(8 + (13.5 * percent))}vw`;

            // Resize logo based on percent also
            logo.style.width = `${12 - (3.3 * percent)}vw`;

            // Resize inner image in logo
            logo.style.backgroundSize = `${9.6 - (2.64 * percent)}vw`;
        }

        else {
            // Set to initial positions
            dashboardButton.style.marginLeft = `${8}vw`;
            logo.style.width = `${12}vw`;
            logo.style.backgroundSize = `${9.6}vw`;
        }
    }

    // When not past the image,
    else {
        // Add sticky class to header
        navBottom.classList.add("sticky");
        
        // Offset margin and set logo size to final position
        dashboardButton.style.marginLeft = `${21.5}vw`;
        logo.style.width = `${8.7}vw`;
        logo.style.backgroundSize = `${6.96}vw`;
    }
}

//for the menu 
function toggleActive() {
    document.body.classList.toggle('active');
    document.querySelectorAll('.section').forEach(section => {
        section.classList.toggle('active');
    });
    document.querySelector('.nav-logo').classList.toggle('active');
}

function sectionClicked() {
    document.body.classList.remove('active');
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    setTimeout(() => {
        document.querySelector('.nav-logo').classList.remove('active');
    }, 100);
}

function themeChange() {
    let DarkMode = JSON.parse(localStorage.getItem('DarkMode'));
    
    const newDarkMode = !DarkMode;
    
    if (newDarkMode) {
        console.log("dark");
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        console.log("light");
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
    
    localStorage.setItem('DarkMode', JSON.stringify(newDarkMode));
    
    console.log("h" + DarkMode);
}


