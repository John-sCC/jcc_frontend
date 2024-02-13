$(document).ready(function () {
    $('#login-form-submit').click(function (event) {
        event.preventDefault();

        var username = $('#username-field').val();
        var password = $('#password-field').val();
        var data = {
            "username": username,
            "password": password
        };

        $.ajax({
            type: "POST",
            url: "https://jcc.stu.nighthawkcodingsociety.com/authenticate",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                console.log("Success: " + response);
            },
            error: function (error) {
                console.error("Error: " + JSON.stringify(error));
            }
        });
    });

    $('#username-field, #password-field').on('input', function () {
        if ($('#username-field').val() && $('#password-field').val()) {
            $('#login-form-submit').prop('disabled', false);
        } else {
            $('#login-form-submit').prop('disabled', true);
        }
    });
});
