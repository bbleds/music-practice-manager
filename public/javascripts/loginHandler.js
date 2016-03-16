(function(){
  "use strict";
$("#loginButton").click(
  function() {
    $.ajax({
      url : $("#loginForm").attr('action'),
      type: "POST",
      data: $("#loginForm").serialize(),
      success: function (data) {
      console.log(window.location.pathname = "/main");
      },
      error: function (jXHR, textStatus, errorThrown) {
        alert(errorThrown);
      }
    });
  }
);
})();
