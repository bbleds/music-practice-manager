"use strict";

app.controller("mainCtrl", ["$http", "ngNotify", function($http, ngNotify){
    const self = this;
    ngNotify.config({
    theme: 'pure',
    position: 'top',
    duration: 4000,
    type: 'info',
    sticky: false,
    button: true,
    html: false
})
    self.addOrganization = (name, abrev, desc) => {
      const data = {
        "orgName" : name,
        "orgAbrev": abrev.toLowerCase(),
        "orgDesc": desc
      };
      const stringedData = JSON.stringify(data);
      $http.post(`/api/organization`, stringedData)
      .then(function successCallback(response) {
        console.log(response);
        if(response.data === "This already exists"){
          ngNotify.set("An organization with this abbreviation or name already exists, please try again.", {
            type: "warn"
          });
        } else {
          self.userOrgs.push(response.data[0]);
          ngNotify.set("Added organization successfully");
        }
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
