"use strict";

app.controller("mainCtrl", ["$http", function($http){
    const self = this;

    self.world = "hello";

    self.addOrganization = (name, abrev, desc) => {
      console.log("name is ");
      console.log(name);
      console.log(abrev);
      console.log(desc);
      const data = {
        "orgName" : name.toLowerCase(),
        "orgAbrev": abrev.toLowerCase(),
        "orgDesc": desc
      };
      const stringedData = JSON.stringify(data);
      console.log(stringedData);
      $http.post(`/api/organization`, stringedData)
      .then(function successCallback(response) {
        console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
    };

    // populate page with organizations belonging to user
    $http.get("/api/organization")
    .then((data) => {
      self.userOrgs = data.data;
    });

}]);
