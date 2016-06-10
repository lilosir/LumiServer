"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Posts = require('../models/posts');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['createPost'],

  createPost: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref, res, next) {
      var params = _ref.params;
      var current_user = _ref.current_user;
      var body = _ref.body;
      var query = _ref.query;
      var image, post, i;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              console.log('body category', body.category);

              if (!(params.id == current_user._id)) {
                _context.next = 18;
                break;
              }

              if (!(body.category == "publicPost")) {
                _context.next = 16;
                break;
              }

              console.log("!!!");
              _context.prev = 4;
              image = [];


              if (body.image.length > 0) {
                for (i = 0; i < body.image.length; i++) {
                  image.push({ uri: body.image[i] });
                }
              }
              _context.next = 9;
              return Posts.create({
                user: params.id,
                category: body.category,
                body: {
                  subject: body.subject,
                  text: body.text,
                  image: image
                } });

            case 9:
              post = _context.sent;
              return _context.abrupt("return", res.send(post));

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", next({ message: _context.t0.message }));

            case 16:
              _context.next = 20;
              break;

            case 18:
              console.log("illegal user");
              res.send(current_user);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 13]]);
    }));

    return function createPost(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }()

});