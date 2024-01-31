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
        if (window.pageYOffset >= 4 * ((window.innerWidth * .4) / 6) + (0.005 * window.innerWidth)) {
            navBottom.classList.add("sticky")
            console.log("yes")
        }
        else {
            navBottom.classList.remove("sticky")
            console.log("no")
        }
    }
})