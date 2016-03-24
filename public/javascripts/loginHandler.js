(function(){
  "use strict";
$("#loginButton").click(
  function() {
    $.ajax({
      url : $("#loginForm").attr('action'),
      type: "POST",
      data: $("#loginForm").serialize(),
      success: function (data) {
      window.location.pathname = "/main";
      },
      error: function (jXHR, textStatus, errorThrown) {
        console.log("there was an error with that request");
      }
    });
  }
);
})();
