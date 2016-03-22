 'use strict';

app.controller('addPracticeCtrl', ['$http', "$stateParams", "$state", function($http, $stateParams, $state){
  const self = this;
  if($stateParams.eventId){
    // get songs and events details, and when posting, change details on it
    $http.get(`/api/${$stateParams.orgId}/practice/${$stateParams.eventId}`)
    .then((data)=>{
      self.title = data.data[0].title;
      self.description = data.data[0].description;
      self.editMode = true;
    });
  }
  self.addPractice = (title, description) => {
    const data = {
      'practiceTitle' : title,
      'practiceDesc': description,
      'orgId' : $stateParams.orgId,
    };
    $http.post('/api/practice', data)
    .then((data)=>{
      const orgId = data.data[0].org_id;
      const eventId = data.data[0].event_id;
      window.location = `${window.location.hash}/${eventId}`;
    });
  };
  self.editPractice = (title, description) => {
    const data = {
      'practiceTitle' : title,
      'practiceDesc': description,
      'orgId' : $stateParams.orgId,
      'eventId': $stateParams.eventId
    };
    $http.post(`/api/${$stateParams.orgId}/practice/${$stateParams.eventId}`, data)
    .then((data)=>{
      if(data.data === "successful"){
        console.log("edited successfully");
      }
    });
  };


}]);
