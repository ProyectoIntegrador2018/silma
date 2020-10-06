"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSyncRequest = handleSyncRequest;
exports.send = exports.SilmaError = void 0;

var _prettyError = _interopRequireDefault(require("pretty-error"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class SilmaError extends Error {
  /**
   *
   * @param {number} status
   * @param {string} message
   */
  constructor(status, message) {
    super(message);
    this.status = status;
  }

} // Sends a successful or failed response to an http request.


exports.SilmaError = SilmaError;

var send = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (response, callback) {
    var session = yield _mongoose.default.connection.startSession();

    try {
      yield session.withTransaction( /*#__PURE__*/_asyncToGenerator(function* () {
        var data = yield callback(session);
        response.send(data);
      }));
    } catch (error) {
      console.log(error);
      var pe = new _prettyError.default();
      var renderedError = pe.render(error);
      console.log(renderedError);
      var message = error.message || "Internal server error";
      var status = error.status || 500;
      response.status(status).send(_objectSpread({
        status: "fail",
        message
      }, error));
    }

    session.endSession();
  });

  return function send(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.send = send;

function handleSyncRequest(callback, next) {
  try {
    callback();
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}