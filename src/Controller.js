// this is a middleware, which can add some additional functions before the functions registerd
var middleWares = [];

class Controller {

  constructor(props) {
    // vitual functions
    this._exposedActions = {};
    // real functions that need to register
    this._actions = {};
    this.middlewares = {};

    for(var key in props) {
      // console.log(key, typeof props[key] === 'function');
      if (typeof props[key] === 'function') {
        this._actions[key] = props[key].bind(this);
        this.addFunc(key);
      } else {
        this.middlewares[key] = props[key];
      }
    }
  }

  addFunc(funName) {
    this._exposedActions[funName] = function() {
      // var functionName = key;
      console.log("FUNCITON:", funName);
     return this.execRealFunction(funName, arguments);
    }.bind(this);
  }

  async execRealFunction(funcName, _arguments) {
    try {
      
      for(var i = 0; i < middleWares.length; i ++) {
        var middleware = middleWares[i];
        if (this.middlewares[middleware.name] 
          && this.middlewares[middleware.name].indexOf(funcName) !== -1) {
            await middleware.action.apply(this, _arguments)
        }
      }

      return this._actions[funcName].apply(this, _arguments);
    } catch(e) {
      return _arguments[_arguments.length - 1](e);
    }
  }

  actions() {
    return this._exposedActions;
  }

  static createController(props) {
    var crl = new Controller(props);
    return crl.actions(); 
  }

  static addCustomAction(name, func) {
    var action = func;
    middleWares.push({name, action});
  }
}

module.exports = Controller;