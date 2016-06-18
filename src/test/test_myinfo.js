// var a = null;
// a = "234"
// console.log(!(a == null))

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();

console.log(hour+":"+min)