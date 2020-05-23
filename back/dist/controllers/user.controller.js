"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllGenres = exports.createUser = exports.authUser = void 0;

var _user = require("../models/user.model");

var _genre = require("../models/genre.model");

var _errors = require("../utils/errors");

var _config = _interopRequireDefault(require("../config.json"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authUser = function authUser(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _request$body, email, password, user, userWithoutHash, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _request$body = request.body, email = _request$body.email, password = _request$body.password;
            _context.next = 3;
            return _user.UserModel.findOne({
              email: email
            }).select(['+password']);

          case 3:
            user = _context.sent;

            if (!(user && _bcrypt["default"].compareSync(password, user.password))) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return _user.UserModel.findOne({
              _id: user._id
            });

          case 7:
            userWithoutHash = _context.sent;
            token = _jsonwebtoken["default"].sign({
              sub: user.id
            }, _config["default"].secret);
            return _context.abrupt("return", _objectSpread({}, userWithoutHash._doc, {
              token: token
            }));

          case 12:
            return _context.abrupt("return", {
              status: "Authentication Failed"
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

exports.authUser = authUser;

var createUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response, role) {
    var data, user, foundUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = request.body;
            _context2.next = 3;
            return _user.UserModel.findOne({
              email: data.email
            }).select(['+password']);

          case 3:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return _user.UserModel.updateOne({
              email: data.email
            }, {
              $addToSet: {
                roles: role
              }
            });

          case 7:
            _context2.next = 16;
            break;

          case 9:
            if (!(data.password.length < 8)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", {
              status: "Password needs to be at least 8 characters long"
            });

          case 11:
            data.roles = [role];
            data.password = _bcrypt["default"].hashSync(data.password, 10);
            _context2.next = 15;
            return _user.UserModel.create(data);

          case 15:
            user = _context2.sent;

          case 16:
            _context2.next = 18;
            return _user.UserModel.findOne({
              _id: user._id
            });

          case 18:
            foundUser = _context2.sent;
            return _context2.abrupt("return", foundUser);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createUser(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getAllGenres = function getAllGenres(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var genres;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _genre.GenreModel.find();

          case 2:
            genres = _context3.sent;
            return _context3.abrupt("return", genres);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
};

exports.getAllGenres = getAllGenres;