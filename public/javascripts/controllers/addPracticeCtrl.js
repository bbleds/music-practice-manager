 'use strict';

app.controller('addPracticeCtrl', ['$http', "$stateParams", "$state", "ngNotify", function($http, $stateParams, $state, ngNotify){
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
    });
  }
  self.addPractice = (title, description) => {
    const data = {
      'practiceTitle' : title,
      'practiceDesc': description,
      'orgId' : $stateParams.orgId,
    };
    $http.post('/api/practice', data)
    .then((data)=>{
      ngNotify.set("Practice saved successfully");
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
        ngNotify.set("Practice edited successfully");
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
      self.currentSongs.push(data.data[0]);
      self.songTitle="";
      self.songInfo="";
      self.songLink="";
      self.songPdf="";
      ngNotify.set("Added song successfully");
    });
  };
  self.selectSong = (song)=>{
    self.selectedSong = song;
    self.editSongTitle = song.title;
    self.editSongInfo = song.song_info;
    self.editSongLink = song.link;
    self.editSongPdf = song.pdf_ref;
  };
  self.editSong = (title,info,link,pdf)=>{
    const data = {
      "title": title,
      "link": link,
      "pdf": pdf,
      "info": info,
      "song_id": self.selectedSong.song_id,
      "event_id": $state.params.eventId
    };
    $http.put("/api/song", data)
    ngNotify.set("Edited song successfully");
    const updatedSongs = [];
    self.currentSongs.map((item)=>{
      if(item.title === self.selectedSong.title && item.song_info === self.selectedSong.song_info){
        item.title = title;
        item.song_info = info;
        item.link = link;
        item.pdf_ref = pdf;
        updatedSongs.push(item);
      } else {
        updatedSongs.push(item);
      }
    })
    self.currentSongs = updatedSongs;

  }
  self.deleteSong = (song)=>{
    $http({
      url: "/api/song",
      method: "DELETE",
      headers: {delparams: JSON.stringify(song)}
    });
    ngNotify.set("Deleted song successfully");
    const remainingSongs=[];
    self.currentSongs.map((item)=>{
      if(item.title !== song.title){
        remainingSongs.push(item);
      }
    });
    self.currentSongs = remainingSongs;

  };


}]);
