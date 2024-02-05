
  $(document).ready(function () {
    $('#login-form').submit(function (event) {
      event.preventDefault();

      var username = $('#username-field').val();
      var password = $('#password-field').val();
      var data = {
        "email": username,
        "password": password
      };

      $.ajax({
        type: "POST",
        url: "http://localhost:8911/authenticate",
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
  