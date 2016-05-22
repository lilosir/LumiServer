'use strict';

var a = [1, 2, 3, 4, 5, 6, 7];
var b = 1;

b = a;
// for (var i = 0; i < 20; i++) {
// 	if(a.length > 9){
// 		a.push(a[a.length - 1]+1);
// 		a.splice(0, 1);
// 	}else{
// 		a.push(a[a.length - 1]+1);
// 	}

// 	console.log(a)
// }

var t = [{ a: 123, b: 321 }, { a: 222, b: 333 }];
var jt = JSON.stringify(t);

var t1 = [{ 'a': 123, 'b': 321 }, { 'a': 222, 'b': 333 }];

var jt1 = JSON.parse(t1);
console.log(jt1);