"use strict";

app.controller("mainCtrl", ["$http", "ngNotify", function($http, ngNotify){
    const self = this;
    ngNotify.config({
      theme: 'pure',
      position: 'bottom',
      duration: 5000,
      type: 'info',
      sticky: false,
      button: true,
      html: false
    })
    self.addOrganization = (name, abrev, desc) => {
      // validate abbreviation
      if(abrev.match(/[^a-z0-9]/g) !== null){
        ngNotify.set("Invalid abbreviation: organization abbreviations must be lowercase letters or numbers and cannot contain spaces, please try again",{
          duration: 10000,
          type: "warn"
        });
      // validate name
      } else if (name === undefined || name === "" || name ===" "){
        ngNotify.set("No organization name was entered or the name was invalid, please try again",{
          duration: 10000,
          type: "warn"
        });
      } else {
        abrev = abrev.trim();
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
      }
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
        ngNotify.set("Deleted organization successfully");
        self.userOrgs = remainingOrgs;
      })

    };

    // populate page with organizations belonging to user
    $http.get("/api/organization")
    .then((data) => {
      self.userOrgs = data.data;
    });

}]);
