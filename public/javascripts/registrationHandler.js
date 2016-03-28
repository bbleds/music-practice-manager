(function(){
  "use strict";
$("#registerSubmit").click(
  function() {
    $.ajax({
      url : $("#registerForm").attr('action'),
      type: "POST",
      data: $("#registerForm").serialize(),
      success: function (data) {
        $("#registerModal").modal('hide');
        $("#loginEmail").val(data.email);
        $("#statusMessage").fadeIn(800);
        $("#statusMessage").html(data.status);
        $("#registerButton").blur();
        $("#loginPassword").focus();
      },
      error: function (jXHR, textStatus, errorThrown) {
        alert(errorThrown);
      }
    });
  }
);
$("#registerButton").click(
  function toggleModal(){
    $("#registerModal").modal('show');
    $("#registerEmail").focus();
  }
);
})();
