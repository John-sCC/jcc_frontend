function signIn() {

    var email = document.getElementById('username-field').value;
    var password = document.getElementById('password-field').value;

    var requestBody = {
        email: email,
        password: password
    };
   
    fetch('https://jcc.stu.nighthawkcodingsociety.com/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        if (data.status == 200) {
            console.log(data);

            document.cookie = "token=" + data.token + "; path=/";
            window.location.replace("{{site.baseurl}}/user-disp-test/");
        } else {
            console.log("Invalid email or password"); 
        }
    })
    .catch(error => {
        console.error('There was an error!', error);

        console.log("Error occurred during sign-in");  
    });
}
