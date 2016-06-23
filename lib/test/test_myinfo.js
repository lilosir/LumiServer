'use strict';

var fetch = require('node-fetch');

var contents = {
  method: 'GET'
};

// fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=lakehead&types=geocode&key=AIzaSyADgz1b7BX9P7pR2bYRnU7z5HvJ_0o8DSo', contents)
//   .then(function (res){
//   	return res.json();
//   })
// .then(function (json){
// 	console.log(json);
// }).catch(function(err){
// 	console.log(err);
// })

fetch('https://api.mapbox.com/v4/directions/mapbox.walking/-89.261904,48.422265;-89.231592,48.431652.json?access_token=pk.eyJ1Ijoic3J5Z2ciLCJhIjoiY2lwcThma2hvMDVoYmZubm9iNWR0Mnp2bSJ9.laJCFI9y3Fwn5bvk5T6YYA', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  // console.log(json.routes[0].geometry.coordinates);
  var coordinates = json.routes[0].geometry.coordinates;
  var new_coordinates = [];
  for (var i = 0; i < coordinates.length; i++) {
    var item_j = [coordinates[i][1], coordinates[i][0]];
    new_coordinates.push(item_j);
  }

  console.log(new_coordinates);
}).catch(function (err) {
  console.log(err);
});

// var orignPlace = this.state.center.longitude+","+this.state.center.latitude;
// var destination = lng+","+lat;
// fetch('https://api.mapbox.com/v4/directions/mapbox.driving/'+orignPlace+';'+destination+'.json?access_token=pk.eyJ1Ijoic3J5Z2ciLCJhIjoiY2lwcThma2hvMDVoYmZubm9iNWR0Mnp2bSJ9.laJCFI9y3Fwn5bvk5T6YYA',contents)     
//   .then(function(res) {
//     return res.json();
//   })
//   .then(function(result) {

//   }.bind(this))