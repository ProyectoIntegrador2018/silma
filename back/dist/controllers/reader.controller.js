"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLastReview = exports.createFeedback = exports.addReaderRegister = exports.createReader = exports.getReader = exports.getReaders = void 0;

var _reader = require("../models/reader.model");

var _user = require("../models/user.model");

var _feedback = require("../models/feedback.model");

var _errors = require("../utils/errors");

var _user2 = require("./user.controller");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Obtiene todos los lectores
var getReaders = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var readers = yield _reader.ReaderModel.find().populate("user");
    return readers;
  }));
}; // Obtiene un lector a través de su ID


exports.getReaders = getReaders;

var getReader = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var reader = yield _reader.ReaderModel.findById(id).populate("user");
    return reader;
  }));
}; // Función que crea un lector que no tiene una cuenta


exports.getReader = getReader;

var createReader = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var UserNew = yield (0, _user2.createUser)(request, response, "reader");
    var data = request.body;
    var lookUserReader = yield _reader.ReaderModel.findOne({
      user: UserNew._id
    });

    if (!lookUserReader) {
      var readerData = _objectSpread({}, data, {
        _id: UserNew._id,
        user: UserNew._id
      });

      var newReader = yield _reader.ReaderModel.create(readerData);
      newReader.user = UserNew;
      return newReader;
    } else {
      throw {
        error: "The e-mail already has a reader account"
      };
    }
  }));
}; //Funcion que registra un lector que ya tiene una cuenta activa


exports.createReader = createReader;

var addReaderRegister = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var data = request.body;

    try {
      var readerData = _objectSpread({}, data, {
        _id: data.userid,
        user: data.userid
      });

      var newReader = yield _reader.ReaderModel.create(readerData);
      yield _user.UserModel.updateOne({
        _id: data.userid
      }, {
        $addToSet: {
          roles: "reader"
        }
      });
      return {
        reader: newReader
      };
    } catch (_unused) {
      throw {
        error: "Register Error"
      };
    }
  }));
}; //Funcion que crea un feedback para una sugerencia


exports.addReaderRegister = addReaderRegister;

var createFeedback = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var data = request.body;
    var feedback = yield _feedback.FeedbackModel.create(data);
    return feedback;
  }));
};

exports.createFeedback = createFeedback;

var updateLastReview = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var newReview = Date.now;
    var reader = yield _reader.ReaderModel.updateOne({
      _id: id
    }, {
      $set: {
        lastReview: Date(newReview)
      }
    }, function (err, res) {
      if (err) throw err;
    });
  }));
};

exports.updateLastReview = updateLastReview;