'use strict';

$('#logout').click(()=>{
  $.get('/api/logout')
  .then((data)=>{
    console.log(data);
    if(data === "logged out successfully"){
      window.location = "/";
    }
  });
})
