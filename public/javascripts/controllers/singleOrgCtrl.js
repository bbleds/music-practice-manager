"use strict";
app.controller("singleOrgCtrl", ["$http", "$stateParams", function($http, $stateParams){
  const self = this;

  self.orgId = $stateParams.orgId;
  $http.get(`/api/${self.orgId}/practice`)
  .then((data) =>{
    self.currentPractices = data.data;
  });

  self.deletePractice = function(practice){
    console.log(practice);
    // send request to api
    $http({
      url: "/api/practice",
      method: "DELETE",
      headers: {delparams: JSON.stringify(practice)}
    })
    .then((data)=> {
      console.log(data);
    });
  }

}]);
