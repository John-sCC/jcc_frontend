// Retrieve user's information from local storage
const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');
const phone = localStorage.getItem('phone');
const email = localStorage.getItem('email');
const address = localStorage.getItem('address');
const skills = localStorage.getItem('skills');
const personaldesc = localStorage.getItem('personaldesc');
const date1_1 = localStorage.getItem('date1_1');
const date1_1b = localStorage.getItem('date1_1b');
const title1 = localStorage.getItem('title1');
const desc1 = localStorage.getItem('desc1');
//
const date1_2 = localStorage.getItem('date1_2');
const date1_2b = localStorage.getItem('date1_2b');
const title2 = localStorage.getItem('title2');
const desc2 = localStorage.getItem('desc2');
//
const date1_3 = localStorage.getItem('date1_3');
const date1_3b = localStorage.getItem('date1_3b');
const title3 = localStorage.getItem('title3');
const desc3 = localStorage.getItem('desc3');
//
const date1_4 = localStorage.getItem('date1_4');
const date1_4b = localStorage.getItem('date1_4b');
const title4 = localStorage.getItem('title4');
const desc4 = localStorage.getItem('desc4');
//
const date1_5 = localStorage.getItem('date1_5');
const date1_5b = localStorage.getItem('date1_5b');
const title5 = localStorage.getItem('title5');
const desc5 = localStorage.getItem('desc5');
//
const hobbies = localStorage.getItem('hobbies');


// Insert user's information into the resume template
document.getElementById('name').innerText = `${firstName} ${lastName}`;
document.getElementById('phone').innerText = phone;
document.getElementById('email').innerText = email;
document.getElementById('address').innerText = address;
document.getElementById('skills').innerText = skills;
document.getElementById('personaldesc').innerText = personaldesc;
document.getElementById('date1_1').innerText = date1_1;
document.getElementById('date1_1b').innerText = date1_1b;
document.getElementById('title1').innerText = title1;
document.getElementById('desc1').innerText = desc1;
//
document.getElementById('date1_2').innerText = date1_2;
document.getElementById('date1_2b').innerText = date1_2b;
document.getElementById('title2').innerText = title2;
document.getElementById('desc2').innerText = desc2;
//
document.getElementById('date1_3').innerText = date1_3;
document.getElementById('date1_3b').innerText = date1_3b;
document.getElementById('title3').innerText = title3;
document.getElementById('desc3').innerText = desc3;
//
document.getElementById('date1_4').innerText = date1_4;
document.getElementById('date1_4b').innerText = date1_4b;
document.getElementById('title4').innerText = title4;
document.getElementById('desc4').innerText = desc4;
//
document.getElementById('date1_5').innerText = date1_5;
document.getElementById('date1_5b').innerText = date1_5b;
document.getElementById('title5').innerText = title5;
document.getElementById('desc5').innerText = desc5;
//
document.getElementById('hobbies').innerText = hobbies;