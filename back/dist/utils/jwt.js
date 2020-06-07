"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = verifyToken;

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _user = require("../models/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function verifyToken() {
  var authorizedRoles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  if (!authorizedRoles) authorizedRoles = ["admin", "writer", "reader"];
  var secret = process.env.SECRET_JWT;
  return (0, _expressJwt.default)({
    secret,
    isRevoked: (req, payload, done) => _isRevoked(req, payload, done, authorizedRoles)
  });
}

function _isRevoked(_x, _x2, _x3, _x4) {
  return _isRevoked2.apply(this, arguments);
}

function _isRevoked2() {
  _isRevoked2 = _asyncToGenerator(function* (req, payload, done, authorizedRoles) {
    var user = yield _user.UserModel.findById(payload.sub);

    if (user) {
      var isAuthorized = authorizedRoles.some(authRole => user.roles.includes(authRole));

      if (isAuthorized) {
        return done();
      }
    } // revoke token if user no longer exists


    return done(null, true);
  });
  return _isRevoked2.apply(this, arguments);
}

;