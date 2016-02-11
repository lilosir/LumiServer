var Users = require('./models/users');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lumi');
var db = mongoose.connection;
db.on('error',function (err){
  consolo.log(err);
})

db.on('disconnected', function (){
  console.log('Datebase disconnected!!');
})

Users.findOne("rsheng@lakeheadu.ca", function(err, docs) {
  // console.log(docs)
  // docs[0].update({
  //       activated: false,
  //       activate_token: '',
  //     }, function(err, doc) {

  //     });
});

// Users.activateUser('56afd875b14015ec52ca2f6f', function(err, doc) {

//   // console.log(doc);

// });

Users.find({_id: '56afdbadb14015ec52ca2f70'}, function(err, docs) {
  console.log(docs);
});

// Users.update({_id: "56afd875b14015ec52ca2f6f"}, {
//         activated: true,
//         activate_token: '',
//       });