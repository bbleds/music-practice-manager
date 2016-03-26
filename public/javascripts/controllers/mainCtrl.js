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
        self.userOrgs.push(response.data[0])
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
      .then((data)=>{
        // remove organization from DOM
        const remainingOrgs = [];
        self.userOrgs.map((item)=>{
          if(item.organization_id !== organization.organization_id){
            remainingOrgs.push(item)
          }
        })
        self.userOrgs = remainingOrgs;
      })

    };

    // populate page with organizations belonging to user
    $http.get("/api/organization")
    .then((data) => {
      self.userOrgs = data.data;
    });

}]);
