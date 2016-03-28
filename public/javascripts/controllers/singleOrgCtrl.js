"use strict";
app.controller("singleOrgCtrl", ["$http", "$state", "$stateParams","lodash","ngNotify", function($http, $state, $stateParams, _, ngNotify){
  const self = this;
  ngNotify.config({
    theme: 'pure',
    position: 'bottom',
    duration: 5000,
    type: 'info',
    sticky: false,
    button: true,
    html: false
  });
  self.orgAbrev = $stateParams.abrev;
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
    })
    .then(()=>{
      ngNotify.set("Deleted practice successfully");
      self.currentPractices.map((item)=>{
        if(item.title !== self.selectedPractice.title){
          remainingPractices.push(item);
        }
      });
      self.currentPractices = remainingPractices;
    });
  };

}]);
