"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillGenres = exports.createGenre = exports.createAdmin = exports.getAdmin = exports.getAdmins = exports.genres = void 0;

var _admin = require("../models/admin.model");

var _genre = require("../models/genre.model");

var _user = require("./user.controller");

var _errors = require("../utils/errors");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var genres = ["Sobrenatural (paranormal)", "Romance", "Aventura", "Fantasía épica (de héroes)", "Fantasía histórica", "Realismo mágico", "Chicas mágicas", "Fantasía tecnológica (ciencia ficción)", "Fantasía oscura", "Steampunk", "Terror", "Fantasía infantil", "Otros"];
exports.genres = genres;

var getAdmins = function getAdmins(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var admins;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _admin.AdminModel.find().populate("user");

          case 2:
            admins = _context.sent;
            return _context.abrupt("return", admins);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

exports.getAdmins = getAdmins;

var getAdmin = function getAdmin(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var id, admin;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = request.params.id;
            _context2.next = 3;
            return _admin.AdminModel.findById(id).populate("user");

          case 3:
            admin = _context2.sent;
            return _context2.abrupt("return", admin);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
};

exports.getAdmin = getAdmin;

var createAdmin = function createAdmin(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var newUser, data, lookUserAdmin, adminData, newAdmin;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _user.createUser)(request, response, "admin");

          case 2:
            newUser = _context3.sent;
            data = request.body;
            _context3.next = 6;
            return _admin.AdminModel.findOne({
              user: newUser._id
            });

          case 6:
            lookUserAdmin = _context3.sent;

            if (lookUserAdmin) {
              _context3.next = 16;
              break;
            }

            adminData = _objectSpread({}, data, {
              user: newUser._id
            });
            _context3.next = 11;
            return _admin.AdminModel.create(adminData);

          case 11:
            newAdmin = _context3.sent;
            newAdmin.user = newUser;
            return _context3.abrupt("return", newAdmin);

          case 16:
            throw {
              error: "The e-mail already has a admin account"
            };

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
};

exports.createAdmin = createAdmin;

var createGenre = function createGenre(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var data, genre;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = request.body;
            _context4.next = 3;
            return _genre.GenreModel.create(data);

          case 3:
            genre = _context4.sent;
            return _context4.abrupt("return", genre);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
};

exports.createGenre = createGenre;

var fillGenres = function fillGenres(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var _iterator, _step, genre, obj;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _genre.GenreModel.deleteMany({});

          case 2:
            _iterator = _createForOfIteratorHelper(genres);
            _context5.prev = 3;

            _iterator.s();

          case 5:
            if ((_step = _iterator.n()).done) {
              _context5.next = 12;
              break;
            }

            genre = _step.value;
            obj = {
              name: genre
            };
            _context5.next = 10;
            return _genre.GenreModel.create(obj);

          case 10:
            _context5.next = 5;
            break;

          case 12:
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](3);

            _iterator.e(_context5.t0);

          case 17:
            _context5.prev = 17;

            _iterator.f();

            return _context5.finish(17);

          case 20:
            return _context5.abrupt("return");

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 14, 17, 20]]);
  })));
};

exports.fillGenres = fillGenres;