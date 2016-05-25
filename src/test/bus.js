// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
    'Accept':'application/json, text/javascript, */*; q=0.01',
	'Accept-Encoding':'gzip, deflate',
	'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
	'Connection':'keep-alive',
	'Content-Length':74,
	'Content-Type':'application/json; charset=UTF-8',
	'Cookie':'lang=en',
	'Host':'www.nextlift.ca',
	'Origin':'http://www.nextlift.ca',
	'Referer':'http://www.nextlift.ca/',
	'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
	'X-Requested-With':'XMLHttpRequest',
  }

var bd = {fromStopAreaName: "1208", toStopAreaName: "", lineId: 0, directionId: 0};

var body = JSON.stringify(bd);

var contents = {
  method: 'POST', 
  headers: headers,
  body:body,
};

fetch('http://www.nextlift.ca/AutoComplete.asmx/GetCalls', contents)
  	.then(function (res){
		return res.json();
	})
	.then(function (json){
    // json = json.reverse()
		console.log('json',json.d.Calls[0]);
	})
	.catch(function(err){
    	console.log('err',err);
  	})