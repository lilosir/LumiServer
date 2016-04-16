"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this is a middleware, which can add some additional functions before the functions registerd
var middleWares = [];

var Controller = function () {
  function Controller(props) {
    _classCallCheck(this, Controller);

    // vitual functions
    this._exposedActions = {};
    // real functions that need to register
    this._actions = {};
    this.middlewares = {};

    for (var key in props) {
      // console.log(key, typeof props[key] === 'function');
      if (typeof props[key] === 'function') {
        this._actions[key] = props[key].bind(this);
        this.addFunc(key);
      } else {
        this.middlewares[key] = props[key];
      }
    }
  }

  _createClass(Controller, [{
    key: "addFunc",
    value: function addFunc(funName) {
      this._exposedActions[funName] = function () {
        // var functionName = key;
        console.log("FUNCITON:", funName);
        return this.execRealFunction(funName, arguments);
      }.bind(this);
    }
  }, {
    key: "execRealFunction",
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(funcName, _arguments) {
        var i, middleware;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                i = 0;

              case 2:
                if (!(i < middleWares.length)) {
                  _context.next = 10;
                  break;
                }

                middleware = middleWares[i];

                if (!(this.middlewares[middleware.name] && this.middlewares[middleware.name].indexOf(funcName) !== -1)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return middleware.action.apply(this, _arguments);

              case 7:
                i++;
                _context.next = 2;
                break;

              case 10:
                return _context.abrupt("return", this._actions[funcName].apply(this, _arguments));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _arguments[_arguments.length - 1](_context.t0));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      return function execRealFunction(_x, _x2) {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: "actions",
    value: function actions() {
      return this._exposedActions;
    }
  }], [{
    key: "createController",
    value: function createController(props) {
      var crl = new Controller(props);
      return crl.actions();
    }
  }, {
    key: "addCustomAction",
    value: function addCustomAction(name, func) {
      var action = func;
      middleWares.push({ name: name, action: action });
    }
  }]);

  return Controller;
}();

module.exports = Controller;