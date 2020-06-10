"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addWriterRegister = exports.createWriter = exports.getWriter = exports.getWriters = void 0;

var _writer = require("../models/writer.model");

var _errors = require("../utils/errors");

var _user = require("./user.controller");

var _user2 = require("../models/user.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Obtiene del modelo de escritores todos los usuarios
var getWriters = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var writers = yield _writer.WriterModel.find().populate("user");
    return writers;
  }));
}; //Obtiene un escritor especifico por su ID


exports.getWriters = getWriters;

var getWriter = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var writer = yield _writer.WriterModel.findById(id).populate("user");
    return writer;
  }));
}; //Funcion que crea un usuario y lector que no está registrado


exports.getWriter = getWriter;

var createWriter = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var UserNew = yield (0, _user.createUser)(request, response, "writer");
    var data = request.body;
    var lookUserWriter = yield _writer.WriterModel.findOne({
      user: UserNew._id
    });

    if (!lookUserWriter) {
      var writerData = _objectSpread({}, data, {
        _id: UserNew._id,
        user: UserNew._id
      });

      var newWriter = yield _writer.WriterModel.create(writerData);
      newWriter.user = UserNew;
      return newWriter;
    } else {
      throw {
        error: "The e-mail already has a writer account"
      };
    }
  }));
}; //Funcion que agrega el rol de escritor a un usuario existente


exports.createWriter = createWriter;

var addWriterRegister = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var data = request.body;

    try {
      var writerData = _objectSpread({}, data, {
        _id: data.userid,
        user: data.userid
      });

      var newWriter = yield _writer.WriterModel.create(writerData);
      yield _user2.UserModel.updateOne({
        _id: data.userid
      }, {
        $addToSet: {
          roles: "writer"
        }
      });
      return {
        writer: newWriter
      };
    } catch (_unused) {
      throw {
        error: "Register Error"
      };
    }
  }));
};

exports.addWriterRegister = addWriterRegister;