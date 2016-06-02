'use strict';

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

var arr = [{
	name: 'A',
	age: 10
}, {
	name: 'B',
	age: 12
}, {
	name: 'C',
	age: 8
}];

var str = { name: 'A', age: 10 };

// console.log(arr.indexOf(str));
for (var i = 0; i < arr.length; i++) {
	if (str.name == arr[i].name && str.age == arr[i].age) {
		arr[i].age = 0;
	}
}

console.log(arr);