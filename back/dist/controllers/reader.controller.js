"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReader = exports.getReader = exports.getReaders = void 0;

var _reader = require("../models/reader.model");

var _errors = require("../utils/errors");

var _user = require("./user.controller");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getReaders = function getReaders(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var readers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _reader.ReaderModel.find().populate("user");

          case 2:
            readers = _context.sent;
            return _context.abrupt("return", readers);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

exports.getReaders = getReaders;

var getReader = function getReader(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var id, reader;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = request.params.id;
            _context2.next = 3;
            return _reader.ReaderModel.findById(id).populate("user");

          case 3:
            reader = _context2.sent;
            return _context2.abrupt("return", reader);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
};

exports.getReader = getReader;

var createReader = function createReader(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var UserNew, data, lookUserReader, readerData, newReader;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _user.createUser)(request, response, "reader");

          case 2:
            UserNew = _context3.sent;
            data = request.body;
            _context3.next = 6;
            return _reader.ReaderModel.findOne({
              user: UserNew._id
            });

          case 6:
            lookUserReader = _context3.sent;

            if (lookUserReader) {
              _context3.next = 16;
              break;
            }

            readerData = _objectSpread({}, data, {
              user: UserNew._id
            });
            _context3.next = 11;
            return _reader.ReaderModel.create(readerData);

          case 11:
            newReader = _context3.sent;
            newReader.user = UserNew;
            return _context3.abrupt("return", newReader);

          case 16:
            throw {
              error: "The e-mail already has a reader account"
            };

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
};

exports.createReader = createReader;