
var fun = function(val) {
  var p = new Promise();
  setTimeout(function() { 
    p.resolve(val);
  }, Math.floor(Math.random() * 5000 + 200));
  return p;
};

var run = async function(){
  // console.log(await fun(1234));
};

// run();