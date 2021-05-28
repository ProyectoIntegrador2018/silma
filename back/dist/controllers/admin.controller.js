"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAdmin = exports.makeAdmin = exports.setRole = exports.getFeedbackIdBySuggestion = exports.movePhase = exports.getFeedback = exports.createAdmin = exports.getAdmin = exports.getAdmins = exports.genres = void 0;

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
};

exports.getFeedback = getFeedback;

var phaseDateUtil = (datesPerPhase, newPhase, oldPhase) => {
  if (oldPhase < newPhase) {
    for (var i = oldPhase + 1; i <= newPhase; i++) {
      datesPerPhase[i] = new Date();
    }
  } else {
    for (var _i = oldPhase; _i > newPhase; _i--) {
      datesPerPhase[_i] = null;
    }
  }

  return datesPerPhase;
}; //Funcion que avanza la fase del texto del cual recibe su ID


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
        phase: newPhase,
        datesPerPhase: phaseDateUtil(text.datesPerPhase, newPhase, text.phase)
      }
    }, function (err, res) {
      if (err) throw err;
    });
    var phaseInfo = _emails.phases[newPhase];
    var writer = yield _writer.WriterModel.findById(text.writer);
    var user = yield _user.UserModel.findById(writer.user); // Enviar correo al autor del avance de su texto

    if (newPhase === 2) {
      // La fase es la de aceptacion
      yield (0, _mailSender.sendEmail)({
        email: user.email,
        subject: "¡Tu novela fue aprobada!"
      }, "accepted", {
        name: user.name,
        title: text.title
      });
    } else {
      yield (0, _mailSender.sendEmail)({
        email: user.email,
        subject: "Tu novela avanzó de Fase"
      }, "next_phase", {
        name: user.name,
        title: text.title,
        phase: newPhase + "-" + phaseInfo.name,
        description: phaseInfo.description
      });
    }
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

var setRole = (req, res) => {
  (0, _errors.send)(res, /*#__PURE__*/_asyncToGenerator(function* () {
    var newRole = yield _admin.AdminModel.findByIdAndUpdate(req.params.id, {
      $set: {
        role: req.params.role
      }
    }, {
      useFindAndModify: false
    }, (err, res) => {
      if (err) throw err;
    });
    return newRole;
  }));
}; // Funcion para hacer administrador a un usuario registrado


exports.setRole = setRole;

var makeAdmin = (req, res) => {
  (0, _errors.send)(res, /*#__PURE__*/_asyncToGenerator(function* () {
    var user = req.body; //Autenticar que no existe ya alguien registrado con el correo

    var lookUserAdmin = yield _admin.AdminModel.findOne({
      user: user._id
    });

    if (!lookUserAdmin) {
      var newAdmin = yield _admin.AdminModel.create(user); // Agregar al campo de roles

      yield _user.UserModel.updateOne({
        _id: user.user
      }, {
        $addToSet: {
          roles: "admin"
        }
      });
      return newAdmin;
    } else {
      throw {
        error: "The e-mail already has a admin account"
      };
    }
  }));
}; // Funcion para remover permisos de administrador


exports.makeAdmin = makeAdmin;

var removeAdmin = (req, res) => {
  (0, _errors.send)(res, /*#__PURE__*/_asyncToGenerator(function* () {
    var user_id = req.params.id;
    yield _admin.AdminModel.findOne({
      user: user_id
    }).deleteOne().exec();
    yield _user.UserModel.update({
      _id: user_id
    }, {
      $pullAll: {
        roles: ["admin"]
      }
    });
  }));
};

exports.removeAdmin = removeAdmin;