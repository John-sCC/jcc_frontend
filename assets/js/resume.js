        function switchTab(evt, tabName) {
            var i, tabContent, tabLinks;
            tabContent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = "none";
            }
            tabLinks = document.getElementsByClassName("tab-header")[0].getElementsByTagName("a");
            for (i = 0; i < tabLinks.length; i++) {
                tabLinks[i].classList.remove("active");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.classList.add("active");
        }
        //
        function save() {
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const skills = document.getElementById('skills').value;
            const personaldesc = document.getElementById('desc').value;
            const date1_1 = document.getElementById('date1.1').value;
            const date1_1b = document.getElementById('date1.1b').value;
            const title1 = document.getElementById('title1').value;
            const desc1 = document.getElementById('desc1').value;
            //
            const date1_2 = document.getElementById('date1.2').value;
            const date1_2b = document.getElementById('date1.2b').value;
            const title2 = document.getElementById('title2').value;
            const desc2 = document.getElementById('desc2').value;
            //
            const date1_3 = document.getElementById('date1.3').value;
            const date1_3b = document.getElementById('date1.3b').value;
            const title3 = document.getElementById('title3').value;
            const desc3 = document.getElementById('desc3').value;
            //
            const date1_4 = document.getElementById('date1.4').value;
            const date1_4b = document.getElementById('date1.4b').value;
            const title4 = document.getElementById('title4').value;
            const desc4 = document.getElementById('desc4').value;
            //
            const date1_5 = document.getElementById('date1.5').value;
            const date1_5b = document.getElementById('date1.5b').value;
            const title5 = document.getElementById('title5').value;
            const desc5 = document.getElementById('desc5').value;
            //
            const hobbies = document.getElementById('hobbies').value;

            // 
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('phone', phone);
            localStorage.setItem('email', email);
            localStorage.setItem('address', address);
            localStorage.setItem('address', address);
            localStorage.setItem('skills', skills);
            localStorage.setItem('personaldesc', personaldesc);
            localStorage.setItem('date1_1', date1_1);
            localStorage.setItem('date1_1b', date1_1b);
            localStorage.setItem('title1', title1);
            localStorage.setItem('desc1', desc1);
            //
            localStorage.setItem('date1_2', date1_2);
            localStorage.setItem('date1_2b', date1_2b);
            localStorage.setItem('title2', title2);
            localStorage.setItem('desc2', desc2);
            //            
            localStorage.setItem('date1_3', date1_3);
            localStorage.setItem('date1_3b', date1_3b);
            localStorage.setItem('title3', title3);
            localStorage.setItem('desc3', desc3);
            //            
            localStorage.setItem('date1_4', date1_4);
            localStorage.setItem('date1_4b', date1_4b);
            localStorage.setItem('title4', title4);
            localStorage.setItem('desc4', desc4);
            //            
            localStorage.setItem('date1_5', date1_5);
            localStorage.setItem('date1_5b', date1_5b);
            localStorage.setItem('title5', title5);
            localStorage.setItem('desc5', desc5);
            //            
            localStorage.setItem('date1_5', date1_5);
            localStorage.setItem('date1_5b', date1_5b);
            localStorage.setItem('title5', title5);
            localStorage.setItem('desc5', desc5);
            //            
            localStorage.setItem('hobbies', hobbies);
            console.log(hobbies)
        }
        function seeResume() {
            window.open('/jcc_frontend/filledresume/', '_blank');
        }