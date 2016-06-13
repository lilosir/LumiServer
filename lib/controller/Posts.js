"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Posts = require('../models/posts');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['createPost', 'likeOrDislike'],

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
                _context.next = 17;
                break;
              }

              //if this is a publi post
              // if(body.category == "publicPost"){
              console.log("!!!");
              _context.prev = 3;
              image = [];


              if (body.image.length > 0) {
                for (i = 0; i < body.image.length; i++) {
                  image.push({ uri: body.image[i] });
                }
              }
              _context.next = 8;
              return Posts.create({
                user: params.id,
                category: body.category,
                body: {
                  subject: body.subject,
                  text: body.text,
                  image: image
                } });

            case 8:
              post = _context.sent;
              return _context.abrupt("return", res.send(post));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", next({ message: _context.t0.message }));

            case 15:
              _context.next = 19;
              break;

            case 17:
              console.log("illegal user");
              res.send(current_user);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 12]]);
    }));

    return function createPost(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }(),

  getPosts: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
      var _req$query, id, category, direction, date, posts;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$query = req.query;
              id = _req$query.id;
              category = _req$query.category;
              direction = _req$query.direction;
              date = _req$query.date;

              // console.log(req.query);

              posts = [];
              _context2.prev = 6;

              if (!id) {
                _context2.next = 13;
                break;
              }

              _context2.next = 10;
              return Posts.findById(id).populate("user", "avatar nickname").exec();

            case 10:
              posts = _context2.sent;
              _context2.next = 21;
              break;

            case 13:
              if (!(direction == 'older')) {
                _context2.next = 17;
                break;
              }

              _context2.next = 16;
              return Posts.find({
                category: category,
                created_at: { $lt: date } }).sort('-created_at').limit(5).populate("user", "avatar nickname");

            case 16:
              posts = _context2.sent;

            case 17:
              if (!(direction == 'newer')) {
                _context2.next = 21;
                break;
              }

              _context2.next = 20;
              return Posts.find({
                category: category,
                created_at: { $gt: date } }).sort('-created_at').limit(5).populate("user", "avatar nickname");

            case 20:
              posts = _context2.sent;

            case 21:
              return _context2.abrupt("return", res.send(posts));

            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](6);
              return _context2.abrupt("return", next({ message: _context2.t0.message }));

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[6, 24]]);
    }));

    return function getPosts(_x4, _x5, _x6) {
      return ref.apply(this, arguments);
    };
  }(),

  likeOrDislike: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref2, res, next) {
      var params = _ref2.params;
      var current_user = _ref2.current_user;
      var body = _ref2.body;
      var query = _ref2.query;
      var id, ifLike, post, post1, post2;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context3.next = 28;
                break;
              }

              id = body.id;
              ifLike = body.ifLike;
              _context3.prev = 3;
              _context3.next = 6;
              return Posts.findByIdAndUpdate(id, { $pull: { like: params.id } }).exec();

            case 6:
              post1 = _context3.sent;
              _context3.next = 9;
              return Posts.findByIdAndUpdate(id, { $pull: { dislike: params.id } }).exec();

            case 9:
              post2 = _context3.sent;

              if (!ifLike) {
                _context3.next = 17;
                break;
              }

              _context3.next = 13;
              return Posts.findByIdAndUpdate(id, { $push: { like: params.id } }).exec();

            case 13:
              post1 = _context3.sent;
              return _context3.abrupt("return", res.status(200).send({ message: 'liked it successfully' }));

            case 17:
              _context3.next = 19;
              return Posts.findByIdAndUpdate(id, { $push: { dislike: params.id } }).exec();

            case 19:
              post2 = _context3.sent;
              return _context3.abrupt("return", res.status(200).send({ message: 'disliked it successfully' }));

            case 21:
              _context3.next = 26;
              break;

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3["catch"](3);
              return _context3.abrupt("return", next({ messgae: _context3.t0.messgae }));

            case 26:
              _context3.next = 30;
              break;

            case 28:
              console.log("illegal user");
              res.send(current_user);

            case 30:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[3, 23]]);
    }));

    return function likeOrDislike(_x7, _x8, _x9) {
      return ref.apply(this, arguments);
    };
  }()

});