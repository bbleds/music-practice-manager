'use strict';

app.controller('addPracticeCtrl', ['$http', "$stateParams", function($http, $stateParams){
  const self = this;
  self.addPractice = (title, description) => {
    const data = {
      'practiceTitle' : title,
      'practiceDesc': description,
      'orgId' : $stateParams.orgId,
    };
    $http.post('/api/practice', data)
    .then((data)=>{
      console.log(data);
    });
  };
  console.log($stateParams);
  if($stateParams.eventId){
    // get songs and events details, and when posting, change details on it
    $http.get(`/api/${$stateParams.orgId}/practice/${$stateParams.eventId}`)
    .then((data)=>{
      self.title = data.data[0].title;
      self.description = data.data[0].description;
      self.editMode = true;
    });
  }
}]);
