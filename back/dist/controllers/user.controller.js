"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllGenres = exports.createUser = exports.getUser = exports.authUser = void 0;

var _user = require("../models/user.model");

var _genre = require("../models/genre.model");

var _errors = require("../utils/errors");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config"));

var _user2 = require("../logics/user.logic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Authenticates a user with correct email and password.
// Response with a user with the token.
var authUser = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      email,
      password
    } = request.body;
    var user = yield _user.UserModel.findOne({
      email
    }).select(["+password"]); // Checks if user with email exists and the password is correct.

    if (user && _bcrypt.default.compareSync(password, user.password)) {
      // Returns user info with token and user type.
      var userWithoutHash = yield _user.UserModel.findOne({
        _id: user._id
      });
      var [admin, writer, reader] = yield (0, _user2.getUserTypes)(userWithoutHash._id);

      var token = _jsonwebtoken.default.sign({
        sub: user.id
      }, _config.default.SECRET_JWT);

      return _objectSpread({}, userWithoutHash._doc, {
        admin,
        writer,
        reader,
        token
      });
    } else {
      return {
        status: "Authentication Failed"
      };
    }
  }));
}; // Response with info of a particular user


exports.authUser = authUser;

var getUser = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var userModel = yield _user.UserModel.findById(id);
    var [admin, writer, reader] = yield (0, _user2.getUserTypes)(userModel._id);

    var user = _objectSpread({}, userModel.toJSON(), {
      admin,
      writer,
      reader
    });

    return user;
  }));
}; // Creates a new user with an assigned role.


exports.getUser = getUser;

var createUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (request, response, role) {
    var data = request.body;
    var user = yield _user.UserModel.findOne({
      email: data.email
    }).select(["+password"]);

    if (!user) {
      if (data.password.length < 8) {
        return {
          status: "Password needs to be at least 8 characters long"
        };
      } // Assigns a role to the user.


      data.roles = [role];
      data.password = _bcrypt.default.hashSync(data.password, 10);
      user = yield _user.UserModel.create(data);
      var foundUser = yield _user.UserModel.findOne({
        _id: user._id
      });
      return foundUser;
    } // Send error when user is already registered.


    throw {
      error: "User already registered"
    };
  });

  return function createUser(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}(); // Response with all the genres.


exports.createUser = createUser;

var getAllGenres = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var genres = yield _genre.GenreModel.find();
    return genres;
  }));
};

exports.getAllGenres = getAllGenres;