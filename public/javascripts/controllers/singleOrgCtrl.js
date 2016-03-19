"use strict";
app.controller("singleOrgCtrl", ["$http", "$stateParams", function($http, $stateParams){
  console.log($stateParams);
  const self = this;
  self.orgId = $stateParams.orgId;
  $http.get(`/api/${self.orgId}/practice`)
  .then((data) =>{
    self.currentPractices = data.data;
  });
  // populate page by state params
  // get from api
    // where user id is req.session.passport.user.userId
    // the get org name where org abbreviation is same as in db
}]);
