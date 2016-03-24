"use strict";

app.controller("mainCtrl", ["$http", function($http){
    const self = this;
    self.addOrganization = (name, abrev, desc) => {
      const data = {
        "orgName" : name.toLowerCase(),
        "orgAbrev": abrev.toLowerCase(),
        "orgDesc": desc
      };
      const stringedData = JSON.stringify(data);
      $http.post(`/api/organization`, stringedData)
      .then(function successCallback(response) {
        self.userOrgs.push({"name":name, "orgdesc": desc})
        }, function errorCallback(response) {
          console.log(response);
        });
    };

    self.selectOrg = (organization) => {
      self.selectedOrg = organization;
    };

    self.deleteOrg = (organization) =>{
      // send delete request to api
      $http({
        url: "/api/organization",
        method: "DELETE",
        headers: {delparams: JSON.stringify(organization)}
      })
      // remove organization from DOM

    };

    // populate page with organizations belonging to user
    $http.get("/api/organization")
    .then((data) => {
      self.userOrgs = data.data;
    });

}]);
