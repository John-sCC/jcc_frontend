// Temporary fix until we get a custom domain
const baseurl = "/jcc_frontend/"

// Wait for HTML elements to load
$(window).ready(function() {
    // Redirect buttons to respective pages
    for (let link of ["classes", "sign-in", "blogs", "about"]) {
        $(`#${link}`).click( function() { 
            location.href = baseurl + link
        })
    }

    // Redirect logo and title clicks to index
    for (let home of ['nav-logo', 'nav-title']) {
        $(`.${home}`).click( function() { 
            location.href = baseurl
        })
    }
})