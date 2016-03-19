'use strict';

app.controller('addPracticeCtrl', ['$http', "$stateParams", function($http, $stateParams){
  const self = this;
console.log($stateParams);
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
}]);
