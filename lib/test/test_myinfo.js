'use strict';

var InitialNews = [{
	subject: 'This is the 1 post',
	reply: 20
}, {
	subject: 'This is the 2 post',
	reply: 320
}, {
	subject: 'This is the 3 post',
	reply: 20
}, {
	subject: 'This is the 4 post',
	reply: 320
}, {
	subject: 'This is the 5 post',
	reply: 20
}];

var a = InitialNews.splice(2, 1);

var kvArray = [{ key: 1, value: 10 }, { key: 2, value: 20 }, { key: 3, value: 30 }];
var reformattedArray = kvArray.map(function (obj, i) {
	return obj.key;
});

console.log(reformattedArray);