"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBetweenDatesPoints = exports.calculateParticiaptionPoints = exports.calculateReadingPoints = exports.calculateAgePoints = exports.calculateGenrePoints = exports.runAlgorithm = exports.addSuggestionSendEmail = exports.assignReaders = void 0;

var _reader = require("../models/reader.model");

var _suggestion = require("../models/suggestion.model");

var _text = require("../models/text.model");

var _mailSender = require("../utils/mailSender");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assignReaders = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (text, number) {
    var resultsAlgorithm = yield runAlgorithm(text);
    resultsAlgorithm = resultsAlgorithm.sort((a, b) => a.points < b.points ? 1 : -1);
    var selectedReaders = resultsAlgorithm.slice(0, number);
    yield addSuggestionSendEmail(selectedReaders, text);
  });

  return function assignReaders(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.assignReaders = assignReaders;

var addSuggestionSendEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (selectedReaders, text) {
    for (var reader of selectedReaders) {
      var suggetionObj = {
        "reader": reader.id,
        "text": text._id,
        "sentDate": new Date(),
        "suggestionStatus": "Pending",
        "score": reader.points
      };
      yield _suggestion.SuggestionModel.create(suggetionObj);
      var readerInfo = yield _reader.ReaderModel.findById(reader.id).populate("user");
      var plazoLectura;

      if (text.numberOfPages > 350) {
        plazoLectura = "cuatro semanas";
      } else {
        plazoLectura = "tres semanas";
      }

      var textEmails = yield _text.TextModel.findById(text._id).populate("genres");
      var listGenre = textEmails.genres.map(genre => genre.name);
      var email = {
        "email": readerInfo.user.email,
        "subject": "New Silma Reading Suggestion!",
        "text": "",
        "html": "\n                <div>\n                    <div>\xA1Hola!</div>\n                    <div>\n                    Te agradecemos por haber rellenado nuestro formulario para ser un lector beta. Actualmente tenemos un libro que es de uno de los g\xE9neros que te agrada y quisi\xE9ramos saber si tienes la oportunidad de leerlo. Tiene ".concat(text.numberOfPages, " p\xE1ginas y es de ").concat(listGenre.join(" ,"), ".\n                    </div>\n                    <div>\n                    No es obligatorio leerlo todo pero, si crees que no vas a tener tiempo para leer este libro, \xA1no te preocupes! Seguir\xE1s en nuestra lista para cuando lo tengas para otra obra.\n                    </div>\n                    <div>\n                    De momento, vamos a explicarte el proceso que debe hacerse como lector beta:\n                    </div>\n                    <div>\n                    <ul>\n                        <li>Debes primero firmar una hoja de confidencialidad para que el libro que leas est\xE9 seguro.</li>\n                        <li>T\xF3mate tu tiempo y reserva un lugar tranquilo en el que puedas leer sin interrupciones.</li>\n                        <li>Abre el texto y l\xE9elo como cualquier otro libro. Disfr\xFAtalo, no pienses en cosas t\xE9cnicas, sino en la historia.</li>\n                        <li>Se deben leer cinco cap\xEDtulos o cincuenta p\xE1ginas. Aunque sientas que el texto es pesado o no te guste, debemos dar la oportunidad al escritor de conocer bien su historia.</li>\n                        <li>Si para las primeras cincuenta p\xE1ginas o cinco cap\xEDtulos la obra no te gust\xF3, puedes detenerte. Despu\xE9s de avisarnos, se te mandar\xE1 una encuesta de salida, donde se te pedir\xE1 tu opini\xF3n sobre el libro y en el que podr\xE1s comentar qu\xE9 te gust\xF3 y qu\xE9 te desagrad\xF3, esto para darle luego al escritor una cr\xEDtica constructiva.</li>\n                        <li>Si la novela te est\xE1 gustando, \xA1puedes proseguir, incluso acab\xE1rtela! Solo recuerda que, para la fecha que te indiquemos, debes decir en el formulario que te mandemos qu\xE9 te gust\xF3, si crees que deber\xEDa publicarse y por qu\xE9.</li>\n                    </ul>\n                    </div>\n                    <div>\n                    Ya que se te ha explicado el proceso, \xBFte agradar\xEDa recibir el libro para revisarlo? El plazo es de ").concat(plazoLectura, " para leer lo m\xEDnimo necesario (50 p\xE1ginas o 5 cap\xEDtulos). Puedes terminarlo luego, si gustas.\n                    Por favor, sea cual sea tu respuesta, contesta a este mensaje para asegurarnos que te lleg\xF3. Si respondes que s\xED puedes leer la obra, te mandaremos un documento junto con la ficha a llenar despu\xE9s de la lectura. Si no, te agredeceremos y quedar\xE1s de nuevo en la lista de lectores beta para otra ocasi\xF3n.\n                    </div>\n                    <div>   \n                    \xA1Esperamos que tengas un buen d\xEDa y quedamos al pendiente de tu respuesta!\n                    </div>\n                    <div>\n                    **Por cuestiones de agilizar el proceso y darle un buen servicio a los participantes de nuestra convocatoria, solicitaremos los servicios de otros lectores beta si este mensaje no es respondido en el plazo de dos semanas**\n                    </div>\n                    <div>\n                    Recuerda actualizar tus fechas de disponibilidad de lectura!\n                    </div>\n                    </span>\n                </div>\n            ")
      };
      yield (0, _mailSender.sendEmail)(email);
    }
  });

  return function addSuggestionSendEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addSuggestionSendEmail = addSuggestionSendEmail;

var runAlgorithm = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (text) {
    var readers = yield _reader.ReaderModel.find().populate("user");
    var resultantReaders = [];

    for (var reader of readers) {
      var genrePoints = yield calculateGenrePoints(reader.preferences, text.genres);
      var agePoints = yield calculateAgePoints(reader.user.birthdate, text.ageRange);
      var readingPoints = yield calculateReadingPoints(reader.readingProficiency);
      var participationPoints = yield calculateParticiaptionPoints(reader.lastReview);
      var betweenDatesPoints = yield calculateBetweenDatesPoints(reader.readFrom, reader.readTill);
      var finalPoints = genrePoints + agePoints + readingPoints + participationPoints + betweenDatesPoints;
      var acceptedRequest = yield _suggestion.SuggestionModel.find({
        reader: reader._id,
        suggestionStatus: "Accepted"
      });
      var pendingRequest = yield _suggestion.SuggestionModel.find({
        reader: reader._id,
        suggestionStatus: "Pending"
      });

      if (agePoints != 0 && acceptedRequest.length === 0 && pendingRequest.length === 0) {
        var resultReader = {
          "id": reader._id,
          "points": finalPoints
        };
        resultantReaders.push(resultReader);
      }
    }

    return resultantReaders;
  });

  return function runAlgorithm(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.runAlgorithm = runAlgorithm;

var calculateGenrePoints = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (userGenres, textGenres) {
    var similar = 0;

    for (var uGenre of userGenres) {
      if (textGenres.includes(uGenre)) {
        similar = similar + 1;
      }
    }

    if (similar === 1) {
      return 2;
    } else if (similar === 2) {
      return 6;
    } else if (similar === 3) {
      return 10;
    } else {
      return 0;
    }
  });

  return function calculateGenrePoints(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.calculateGenrePoints = calculateGenrePoints;

var calculateAgePoints = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (userBirthDate, textYears) {
    var today = new Date();
    var birthDate = new Date(userBirthDate);
    var UsersAge = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
      UsersAge = UsersAge - 1;
    }

    var arr = textYears.split(/-/g);

    if (arr[0] === "18+") {
      var bookMinAge = 18;
      var bookMaxAge = 1000;
    } else {
      var bookMinAge = parseInt(arr[0]);
      var bookMaxAge = parseInt(arr[1]);
    }

    if (UsersAge < bookMinAge) {
      return 0;
    }

    var earnedPoints = 7;

    if (UsersAge >= bookMinAge && UsersAge <= bookMaxAge) {
      return earnedPoints;
    }

    for (var i = 3; i >= 0; i--) {
      if (UsersAge <= bookMaxAge || bookMaxAge > 18) {
        return earnedPoints;
      }

      earnedPoints = earnedPoints - 2;
      bookMaxAge = bookMaxAge + 3;
    }
  });

  return function calculateAgePoints(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.calculateAgePoints = calculateAgePoints;

var calculateReadingPoints = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (readingProficiency) {
    if (readingProficiency === "3 or less") {
      return 2;
    } else if (readingProficiency === "4 to 6") {
      return 1;
    } else {
      return 0;
    }
  });

  return function calculateReadingPoints(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.calculateReadingPoints = calculateReadingPoints;

var calculateParticiaptionPoints = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (participationDate) {
    var todaysDate = new Date();
    var months = todaysDate.getMonth() - participationDate.getMonth() + 12 * (todaysDate.getFullYear() - participationDate.getFullYear());

    if (months > 18) {
      return 2;
    } else if (months >= 6 && months <= 18) {
      return 1;
    }

    return 0;
  });

  return function calculateParticiaptionPoints(_x11) {
    return _ref7.apply(this, arguments);
  };
}();

exports.calculateParticiaptionPoints = calculateParticiaptionPoints;

var calculateBetweenDatesPoints = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (initialDate, finalDate) {
    var todaysDate = new Date();

    if (todaysDate <= finalDate && todaysDate >= initialDate) {
      return 1;
    } else {
      return 0;
    }
  });

  return function calculateBetweenDatesPoints(_x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

exports.calculateBetweenDatesPoints = calculateBetweenDatesPoints;