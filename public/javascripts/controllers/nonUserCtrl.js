"use strict";

app.controller("nonUserCtrl", ["$http", "$stateParams", function($http,$stateParams){
  const self = this;
  //------------ functions
  // sets the songs for a specifc practice
  self.setSongs = (practice)=>{
    console.log(practice);
    $http.get(`/api/song/${practice.event_id}`)
    .then((songs)=>{
      self.practiceSongs = songs;
      console.log("songs are");
      console.log(songs);
    });
  };

  // set the selected practice to display
  self.selectPractice = (practice)=>{
    self.selectedPractice = practice;
    self.setSongs(practice);
  }

  // ------------ functionality

  // get all data for an organization by org abbreviation
  $http.get(`/api/organization/${$stateParams.orgAbbrev}`)
  .then((data)=>{
    self.organization = data.data.orgDetails.name
    self.practices = data.data.practices;
    // set latest practice as seletced practice
    self.selectedPractice = self.practices[self.practices.length-1];
    self.setSongs(self.selectedPractice);
  });

}]);
