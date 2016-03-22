 'use strict';

app.controller('addPracticeCtrl', ['$http', "$stateParams", "$state", function($http, $stateParams, $state){
  const self = this;
  if($stateParams.eventId){
    // get events details, and when posting, change details on it
    $http.get(`/api/${$stateParams.orgId}/practice/${$stateParams.eventId}`)
    .then((data)=>{
      self.title = data.data[0].title;
      self.description = data.data[0].description;
      self.editMode = true;
    });
    // get all songs connected to event
    $http.get(`/api/song/${$state.params.eventId}`)
    .then((data)=>{
      self.currentSongs = data.data;
    })
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

  self.saveSong = (title,link,pdf,info) =>{
    const data = {
      "title": title,
      "link": link,
      "pdf": pdf,
      "info": info,
      "event_id": $state.params.eventId
    };
    $http.post(`/api/song`, data)
    .then((data)=>{
      console.log(data);
    });
  };


}]);
