"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeedbackIdBySuggestion = exports.movePhase = exports.getFeedback = exports.createAdmin = exports.getAdmin = exports.getAdmins = exports.genres = void 0;

var _admin = require("../models/admin.model");

var _feedback = require("../models/feedback.model");

var _text = require("../models/text.model");

var _writer = require("../models/writer.model");

var _user = require("../models/user.model");

var _user2 = require("./user.controller");

var _errors = require("../utils/errors");

var _mailSender = require("../utils/mailSender");

var _emails = require("../utils/emails");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Generos base de Silma
var genres = ["Sobrenatural (paranormal)", "Romance", "Aventura", "Fantasía épica (de héroes)", "Fantasía histórica", "Realismo mágico", "Chicas mágicas", "Fantasía tecnológica (ciencia ficción)", "Fantasía oscura", "Steampunk", "Terror", "Fantasía infantil", "Otros"]; //Funcion que regresa todo los usuarios de tipo administrador

exports.genres = genres;

var getAdmins = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var admins = yield _admin.AdminModel.find().populate("user");
    return admins;
  }));
}; //Funcion que regresa el administrador que coincide con el id recibido


exports.getAdmins = getAdmins;

var getAdmin = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var admin = yield _admin.AdminModel.findById(id).populate("user");
    return admin;
  }));
}; //Funcion que crea un administrador


exports.getAdmin = getAdmin;

var createAdmin = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var newUser = yield (0, _user2.createUser)(request, response, "admin");
    var data = request.body; //Autenticar que no existe ya alguien registrado con el correo

    var lookUserAdmin = yield _admin.AdminModel.findOne({
      user: newUser._id
    });

    if (!lookUserAdmin) {
      var adminData = _objectSpread({}, data, {
        _id: newUser._id,
        user: newUser._id
      });

      var newAdmin = yield _admin.AdminModel.create(adminData);
      newAdmin.user = newUser;
      return newAdmin;
    } else {
      throw {
        error: "The e-mail already has a admin account"
      };
    }
  }));
}; //Funcion que regresa la retroalimentacion de un lector de un texto


exports.createAdmin = createAdmin;

var getFeedback = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var feedback = yield _feedback.FeedbackModel.findById(id);
    return feedback;
  }));
}; //Funcion que avanza la fase del texto del cual recibe su ID


exports.getFeedback = getFeedback;

var movePhase = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var text = yield _text.TextModel.findById(id);
    var newPhase = request.body.phase;
    var phase = yield _text.TextModel.updateOne({
      _id: id
    }, {
      $set: {
        phase: newPhase
      }
    }, function (err, res) {
      if (err) throw err;
    });
    /*
    const phaseInfo = phases[newPhase];
    const writer = await WriterModel.findById(text.writer);
    const user = await UserModel.findById(writer.user);
    //Enviar correo al autor del avance de su texto
    if (newPhase === 2) {
      // La fase es la de aceptacion
      await sendEmail(
        {
          email: user.email,
          subject: "¡Tu novela fue aprobada!"
        },
        "accepted",
        {
          name: user.name,
          title: text.title
        }
      );
    } else {
      await sendEmail(
        {
          email: user.email,
          subject: "Tu novela avanzó de Fase"
        },
        "next_phase",
        {
          name: user.name,
          title: text.title,
          phase: newPhase + "-" + phaseInfo.name,
          description: phaseInfo.description
        }
      );
    }*/
  }));
}; //Funcion que obtiene la retroalimentacion ligada a la sugerencia recibida por su id


exports.movePhase = movePhase;

var getFeedbackIdBySuggestion = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var feedback = yield _feedback.FeedbackModel.find({
      suggestion: id
    });
    return feedback[0]._id;
  }));
};

exports.getFeedbackIdBySuggestion = getFeedbackIdBySuggestion;