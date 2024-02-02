// Wait for HTML elements to load
$(window).ready(function() {
    var navBottom = $(".nav-bottom")[0]

    // Redirect buttons to respective pages
    for (let link of ["classes", "sign-in", "blogs", "about"]) {
        $(`#${link}`).click( function() { 
            location.href = `${baseurl}/${link}`
        })
    }

    // Redirect logo and title clicks to index
    for (let home of ['nav-logo', 'nav-title']) {
        $(`.${home}`).click( function() { 
            location.href = `${baseurl}/`
        })
    }

    window.onscroll = function () { 
        // Calculate 1/6th of the header, as it is divided into segments of 1-4-1 (top-middle-bottom)
        const base = ((window.innerWidth * .3) / 6) 

        // Define the farthest left button to move for logo
        const classButton = $("#classes")[0]

        // Define the logo
        const logo = $(".nav-logo")[0]

        // Upon scrolling past the middle section,
        if (window.pageYOffset < 4 * base) {
            // Remove sticky class from header
            navBottom.classList.remove("sticky")

            if (window.pageYOffset >= (base * 2.5)) {
                // Calculate percentage from initial to final position based on scroll
                    // I could not explain this to you, it's gibberish.
                const percent =  (window.pageYOffset - (base * 2.5)) / (base * 1.5)

                // Move button with margin left based on how far scrolled to animate
                classButton.style.marginLeft = `${(6.3 + (15.2 * percent))}vw`

                // Resize logo based on percent also
                logo.style.width = `${12 - (3.3 * percent)}vw`

                // Resize inner image in logo
                logo.style.backgroundSize = `${9.6 - (2 * percent)}vw`
            }

            else {
                // Set to initial positions
                classButton.style.marginLeft = `${6.3}vw`
                logo.style.width = `${12}vw`
                logo.style.backgroundSize = `${9.6}vw`
            }
        }

        // When not past the image,
        else {
            // Add sticky class to header
            navBottom.classList.add("sticky")
            
            // Offset margin and set logo size to final position
            classButton.style.marginLeft = `${21.5}vw`
            logo.style.width = `${8.7}vw`
            logo.style.backgroundSize = `${7.6}vw`

        }
    }
})