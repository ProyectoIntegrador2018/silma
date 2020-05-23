"use strict";

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _user = require("../models/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = jwt;

function jwt() {
  var secret = process.env.SECRET_JWT;
  return (0, _expressJwt.default)({
    secret,
    isRevoked
  }).unless({
    path: [/^(?!.*(\/api\/)).*$/, // public routes that don't require authentication
    '/api/register/readers', '/api/register/writers', '/api/admins/register', '/api/user/authentication', '/api/user/genres', '/api/admins/fillGenres']
  });
}

function isRevoked(_x, _x2, _x3) {
  return _isRevoked.apply(this, arguments);
}

function _isRevoked() {
  _isRevoked = _asyncToGenerator(function* (req, payload, done) {
    var user = yield _user.UserModel.findById(payload.sub); // revoke token if user no longer exists

    if (!user) {
      return done(null, true);
    }

    done();
  });
  return _isRevoked.apply(this, arguments);
}

;