"use strict";
app.controller("singleOrgCtrl", ["$http", "$state", "$stateParams","lodash", function($http, $state, $stateParams, _){
  const self = this;
  self.orgId = $stateParams.orgId;
  $http.get(`/api/${self.orgId}/practice`)
  .then((data) =>{
    self.currentPractices = data.data;
  });

  self.setSelectedPractice = (practice) => {
    console.log(practice);
    self.selectedPractice = practice;
  };

  self.deletePractice = ()=>{
    const remainingPractices =[];
    $http({
      url: "/api/practice",
      method: "DELETE",
      headers: {delparams: JSON.stringify(self.selectedPractice)}
    });
    self.currentPractices.map((item)=>{
      if(item.title !== self.selectedPractice.title){
        remainingPractices.push(item);
      }
    })
    self.currentPractices = remainingPractices;
  };

}]);
