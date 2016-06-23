// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "c98574dd-b091-3d70-624e-cf79acb48944",
  }

var body = JSON.stringify({
  id:"574761f43ce12658159781b5",
  });

var contents = {
  method: 'POST', 
  headers: headers, 
  body: body,
};

fetch('http://localhost:3100/users/addFriend/574761f43ce12658159781b3',contents)
  .then(function(res) {
    return res.json();
  })
  .then(function(json) {
    console.log(json);
  })
  .catch(function(err){
    console.log(err);
  })

// go: function(){
//    var lat = this.state.center.latitude;
//     var lng = this.state.center.longitude;
//      fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&radius=5000&name=sushi+station&key=AIzaSyADgz1b7BX9P7pR2bYRnU7z5HvJ_0o8DSo',contents)
//       .then(function(result){
//         return result.json();
//       })
//       .then(function(places){

//         var des_lat = places.results[0].geometry.location.lat;
//         var des_lng = places.results[0].geometry.location.lng;

//         this.addAnnotations(mapRef, [{
//           coordinates: [des_lat,des_lng],
//           type: 'point',
//           title: 'This is a new marker',
//           id: 'searched place'
//         }])

//         return fetch('https://api.mapbox.com/v4/directions/mapbox.walking/-89.261904,48.422265;-89.231592,48.431652.json?access_token=pk.eyJ1Ijoic3J5Z2ciLCJhIjoiY2lwcThma2hvMDVoYmZubm9iNWR0Mnp2bSJ9.laJCFI9y3Fwn5bvk5T6YYA',contents)
        
//       }.bind(this))
//       .then(function(res) {
//         return res.json();
//       })
//       .then(function(json) {
//           // console.log(json.routes[0].geometry.coordinates);
//           var coordinates = json.routes[0].geometry.coordinates;
//           var new_coordinates = [];
//           for (var i = 0; i < coordinates.length; i++) {
//             var item_j = [coordinates[i][1],coordinates[i][0]];
//             new_coordinates.push(item_j);
//           }

//           console.log(new_coordinates)
//       })
//       .catch(function(err){
//           console.log(err);
//       })
// }


// changeText: async function(value){

//     var result = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ value +'&types=geocode&key=AIzaSyADgz1b7BX9P7pR2bYRnU7z5HvJ_0o8DSo', contents);
//     console.log("!!!!!!!!!!!result",await result.json())
    
//     var result2 = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ value +'&types=geocode&key=AIzaSyADgz1b7BX9P7pR2bYRnU7z5HvJ_0o8DSo', contents)
//     var json = await result2.json();
      
//     var predictions = json.predictions.map(function(item, i){
//       return {
//           description: item.description,
//           id: item.place_id,
//         }
//     });

//     this.setState({
//       places: predictions,
//     });
//   },
