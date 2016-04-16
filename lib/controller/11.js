"use strict";

ff = [{ username: "name1", _id: "id1", avatar: "avatar1" }, { username: "name2", _id: "id2", avatar: "avatar2" }];
var kk = ff.map(function (item) {
      return { "username": item.username, "id": item._id, "avatar": item.avatar };
});

console.log(kk);