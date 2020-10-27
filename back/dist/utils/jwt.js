"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = verifyToken;

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _user = require("../models/user.model");

var _admin = require("../models/admin.model");

var _writer = require("../models/writer.model");

var _reader = require("../models/reader.model");

var _config = _interopRequireDefault(require("../config/config"));

var _errors = require("./errors");

var _messages = _interopRequireDefault(require("./messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *
 * @param {['admin', 'reader', 'writer']} authorizedUserTypes User types of the current user
 * @param {string} permission Permission required
 */
function verifyToken(authorizedUserTypes) {
  var permission = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // If array is empty, any role can access that endpoint
  authorizedUserTypes = authorizedUserTypes || ["admin", "reader", "writer"];
  var secret = _config.default.SECRET_JWT;
  return (0, _expressJwt.default)({
    secret,
    isRevoked: (req, payload, done) => _isRevoked(req, payload, done, authorizedUserTypes, permission)
  });
}

function _isRevoked(_x, _x2, _x3, _x4, _x5) {
  return _isRevoked2.apply(this, arguments);
}
/**
 *
 * @param {string[]} authorizedUserTypes
 * @param {[any, any, any]} userTypes
 * @param {string} permission
 */


function _isRevoked2() {
  _isRevoked2 = _asyncToGenerator(function* (req, payload, done, authorizedUserTypes, permission) {
    var user = yield _user.UserModel.findById(payload.sub);
    if (!user) return done(error, true);

    var adminPromise = _admin.AdminModel.findOne({
      user: user._id
    }).populate("role");

    var writerPromise = _writer.WriterModel.findOne({
      user: user._id
    }).populate("role");

    var readerPromise = _reader.ReaderModel.findOne({
      user: user._id
    }).populate("role");

    var roles = yield Promise.all([adminPromise, writerPromise, readerPromise]);

    if (user) {
      var isAuthorized = hasPermission(authorizedUserTypes, roles, permission);

      if (isAuthorized) {
        return done();
      }
    } // Revoke token if user no longer exists or doesn't have access to the route


    var error = new _errors.SilmaError(401, _messages.default.Unauthorized());
    return done(error, true);
  });
  return _isRevoked2.apply(this, arguments);
}

function hasPermission(authorizedUserTypes, userTypes, permission) {
  var [admin, writer, reader] = userTypes;
  var adminAccess = admin && authorizedUserTypes.some(x => x === "admin") && (permission === null || admin.role && admin.role[permission]);
  var writerAccess = writer && authorizedUserTypes.some(x => x === "writer");
  var readerAccess = reader && authorizedUserTypes.some(x => x === "reader");
  return adminAccess || writerAccess || readerAccess;
}