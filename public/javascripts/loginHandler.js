(function(){
  "use strict";
$("#loginButton").click(
  function() {
    $.ajax({
      url : $("#loginForm").attr('action'),
      type: "POST",
      data: $("#registerForm").serialize(),
      success: function (data) {
      console.log(data);
      },
      error: function (jXHR, textStatus, errorThrown) {
        alert(errorThrown);
      }
    });
  }
);
})();
