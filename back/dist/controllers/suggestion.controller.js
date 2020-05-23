"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBetweenDatesPoints = exports.calculateParticiaptionPoints = exports.calculateReadingPoints = exports.calculateAgePoints = exports.calculateGenrePoints = exports.runAlgorithm = exports.addSuggestionSendEmail = exports.assignReaders = void 0;

var _reader = require("../models/reader.model");

var _suggestion = require("../models/suggestion.model");

var _text = require("../models/text.model");

var _mailSender = require("../utils/mailSender");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assignReaders = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text, number) {
    var resultsAlgorithm, selectedReaders;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return runAlgorithm(text);

          case 2:
            resultsAlgorithm = _context.sent;
            resultsAlgorithm = resultsAlgorithm.sort(function (a, b) {
              return a.points < b.points ? 1 : -1;
            });
            selectedReaders = resultsAlgorithm.slice(0, number);
            _context.next = 7;
            return addSuggestionSendEmail(selectedReaders, text);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function assignReaders(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.assignReaders = assignReaders;

var addSuggestionSendEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(selectedReaders, text) {
    var _iterator, _step, reader, suggetionObj, readerInfo, plazoLectura, textEmails, listGenre, email;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iterator = _createForOfIteratorHelper(selectedReaders);
            _context2.prev = 1;

            _iterator.s();

          case 3:
            if ((_step = _iterator.n()).done) {
              _context2.next = 21;
              break;
            }

            reader = _step.value;
            suggetionObj = {
              "reader": reader.id,
              "text": text._id,
              "sentDate": new Date(),
              "suggestionStatus": "Pending",
              "score": reader.points
            };
            _context2.next = 8;
            return _suggestion.SuggestionModel.create(suggetionObj);

          case 8:
            _context2.next = 10;
            return _reader.ReaderModel.findById(reader.id).populate("user");

          case 10:
            readerInfo = _context2.sent;

            if (text.numberOfPages > 350) {
              plazoLectura = "cuatro semanas";
            } else {
              plazoLectura = "tres semanas";
            }

            _context2.next = 14;
            return _text.TextModel.findById(text._id).populate("genres");

          case 14:
            textEmails = _context2.sent;
            listGenre = textEmails.genres.map(function (genre) {
              return genre.name;
            });
            email = {
              "email": readerInfo.user.email,
              "subject": "New Silma Reading Suggestion!",
              "text": "",
              "html": "\n                <div>\n                    <div>\xA1Hola!</div>\n                    <div>\n                    Te agradecemos por haber rellenado nuestro formulario para ser un lector beta. Actualmente tenemos un libro que es de uno de los g\xE9neros que te agrada y quisi\xE9ramos saber si tienes la oportunidad de leerlo. Tiene ".concat(text.numberOfPages, " p\xE1ginas y es de ").concat(listGenre.join(" ,"), ".\n                    </div>\n                    <div>\n                    No es obligatorio leerlo todo pero, si crees que no vas a tener tiempo para leer este libro, \xA1no te preocupes! Seguir\xE1s en nuestra lista para cuando lo tengas para otra obra.\n                    </div>\n                    <div>\n                    De momento, vamos a explicarte el proceso que debe hacerse como lector beta:\n                    </div>\n                    <div>\n                    <ul>\n                        <li>Debes primero firmar una hoja de confidencialidad para que el libro que leas est\xE9 seguro.</li>\n                        <li>T\xF3mate tu tiempo y reserva un lugar tranquilo en el que puedas leer sin interrupciones.</li>\n                        <li>Abre el texto y l\xE9elo como cualquier otro libro. Disfr\xFAtalo, no pienses en cosas t\xE9cnicas, sino en la historia.</li>\n                        <li>Se deben leer cinco cap\xEDtulos o cincuenta p\xE1ginas. Aunque sientas que el texto es pesado o no te guste, debemos dar la oportunidad al escritor de conocer bien su historia.</li>\n                        <li>Si para las primeras cincuenta p\xE1ginas o cinco cap\xEDtulos la obra no te gust\xF3, puedes detenerte. Despu\xE9s de avisarnos, se te mandar\xE1 una encuesta de salida, donde se te pedir\xE1 tu opini\xF3n sobre el libro y en el que podr\xE1s comentar qu\xE9 te gust\xF3 y qu\xE9 te desagrad\xF3, esto para darle luego al escritor una cr\xEDtica constructiva.</li>\n                        <li>Si la novela te est\xE1 gustando, \xA1puedes proseguir, incluso acab\xE1rtela! Solo recuerda que, para la fecha que te indiquemos, debes decir en el formulario que te mandemos qu\xE9 te gust\xF3, si crees que deber\xEDa publicarse y por qu\xE9.</li>\n                    </ul>\n                    </div>\n                    <div>\n                    Ya que se te ha explicado el proceso, \xBFte agradar\xEDa recibir el libro para revisarlo? El plazo es de ").concat(plazoLectura, " para leer lo m\xEDnimo necesario (50 p\xE1ginas o 5 cap\xEDtulos). Puedes terminarlo luego, si gustas.\n                    Por favor, sea cual sea tu respuesta, contesta a este mensaje para asegurarnos que te lleg\xF3. Si respondes que s\xED puedes leer la obra, te mandaremos un documento junto con la ficha a llenar despu\xE9s de la lectura. Si no, te agredeceremos y quedar\xE1s de nuevo en la lista de lectores beta para otra ocasi\xF3n.\n                    </div>\n                    <div>   \n                    \xA1Esperamos que tengas un buen d\xEDa y quedamos al pendiente de tu respuesta!\n                    </div>\n                    <div>\n                    **Por cuestiones de agilizar el proceso y darle un buen servicio a los participantes de nuestra convocatoria, solicitaremos los servicios de otros lectores beta si este mensaje no es respondido en el plazo de dos semanas**\n                    </div>\n                    <div>\n                    Recuerda actualizar tus fechas de disponibilidad de lectura!\n                    </div>\n                    </span>\n                </div>\n            ")
            };
            _context2.next = 19;
            return (0, _mailSender.sendEmail)(email);

          case 19:
            _context2.next = 3;
            break;

          case 21:
            _context2.next = 26;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](1);

            _iterator.e(_context2.t0);

          case 26:
            _context2.prev = 26;

            _iterator.f();

            return _context2.finish(26);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 23, 26, 29]]);
  }));

  return function addSuggestionSendEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addSuggestionSendEmail = addSuggestionSendEmail;

var runAlgorithm = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(text) {
    var readers, resultantReaders, _iterator2, _step2, reader, genrePoints, agePoints, readingPoints, participationPoints, betweenDatesPoints, finalPoints, acceptedRequest, pendingRequest, resultReader;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _reader.ReaderModel.find().populate("user");

          case 2:
            readers = _context3.sent;
            resultantReaders = [];
            _iterator2 = _createForOfIteratorHelper(readers);
            _context3.prev = 5;

            _iterator2.s();

          case 7:
            if ((_step2 = _iterator2.n()).done) {
              _context3.next = 34;
              break;
            }

            reader = _step2.value;
            _context3.next = 11;
            return calculateGenrePoints(reader.preferences, text.genres);

          case 11:
            genrePoints = _context3.sent;
            _context3.next = 14;
            return calculateAgePoints(reader.user.birthdate, text.ageRange);

          case 14:
            agePoints = _context3.sent;
            _context3.next = 17;
            return calculateReadingPoints(reader.readingProficiency);

          case 17:
            readingPoints = _context3.sent;
            _context3.next = 20;
            return calculateParticiaptionPoints(reader.lastReview);

          case 20:
            participationPoints = _context3.sent;
            _context3.next = 23;
            return calculateBetweenDatesPoints(reader.readFrom, reader.readTill);

          case 23:
            betweenDatesPoints = _context3.sent;
            finalPoints = genrePoints + agePoints + readingPoints + participationPoints + betweenDatesPoints;
            _context3.next = 27;
            return _suggestion.SuggestionModel.find({
              reader: reader._id,
              suggestionStatus: "Accepted"
            });

          case 27:
            acceptedRequest = _context3.sent;
            _context3.next = 30;
            return _suggestion.SuggestionModel.find({
              reader: reader._id,
              suggestionStatus: "Pending"
            });

          case 30:
            pendingRequest = _context3.sent;

            if (agePoints != 0 && acceptedRequest.length === 0 && pendingRequest.length === 0) {
              resultReader = {
                "id": reader._id,
                "points": finalPoints
              };
              resultantReaders.push(resultReader);
            }

          case 32:
            _context3.next = 7;
            break;

          case 34:
            _context3.next = 39;
            break;

          case 36:
            _context3.prev = 36;
            _context3.t0 = _context3["catch"](5);

            _iterator2.e(_context3.t0);

          case 39:
            _context3.prev = 39;

            _iterator2.f();

            return _context3.finish(39);

          case 42:
            return _context3.abrupt("return", resultantReaders);

          case 43:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 36, 39, 42]]);
  }));

  return function runAlgorithm(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.runAlgorithm = runAlgorithm;

var calculateGenrePoints = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userGenres, textGenres) {
    var similar, _iterator3, _step3, uGenre;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            similar = 0;
            _iterator3 = _createForOfIteratorHelper(userGenres);

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                uGenre = _step3.value;

                if (textGenres.includes(uGenre)) {
                  similar = similar + 1;
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            if (!(similar === 1)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", 2);

          case 7:
            if (!(similar === 2)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", 6);

          case 11:
            if (!(similar === 3)) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", 10);

          case 15:
            return _context4.abrupt("return", 0);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function calculateGenrePoints(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.calculateGenrePoints = calculateGenrePoints;

var calculateAgePoints = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userBirthDate, textYears) {
    var today, birthDate, UsersAge, m, arr, bookMinAge, bookMaxAge, earnedPoints, i;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            today = new Date();
            birthDate = new Date(userBirthDate);
            UsersAge = today.getFullYear() - birthDate.getFullYear();
            m = today.getMonth() - birthDate.getMonth();

            if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
              UsersAge = UsersAge - 1;
            }

            arr = textYears.split(/-/g);

            if (arr[0] === "18+") {
              bookMinAge = 18;
              bookMaxAge = 1000;
            } else {
              bookMinAge = parseInt(arr[0]);
              bookMaxAge = parseInt(arr[1]);
            }

            if (!(UsersAge < bookMinAge)) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", 0);

          case 9:
            earnedPoints = 7;

            if (!(UsersAge >= bookMinAge && UsersAge <= bookMaxAge)) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", earnedPoints);

          case 12:
            i = 3;

          case 13:
            if (!(i >= 0)) {
              _context5.next = 21;
              break;
            }

            if (!(UsersAge <= bookMaxAge || bookMaxAge > 18)) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", earnedPoints);

          case 16:
            earnedPoints = earnedPoints - 2;
            bookMaxAge = bookMaxAge + 3;

          case 18:
            i--;
            _context5.next = 13;
            break;

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function calculateAgePoints(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.calculateAgePoints = calculateAgePoints;

var calculateReadingPoints = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(readingProficiency) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(readingProficiency === "3 or less")) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", 2);

          case 4:
            if (!(readingProficiency === "4 to 6")) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", 1);

          case 8:
            return _context6.abrupt("return", 0);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function calculateReadingPoints(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.calculateReadingPoints = calculateReadingPoints;

var calculateParticiaptionPoints = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(participationDate) {
    var todaysDate, months;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            todaysDate = new Date();
            months = todaysDate.getMonth() - participationDate.getMonth() + 12 * (todaysDate.getFullYear() - participationDate.getFullYear());

            if (!(months > 18)) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", 2);

          case 6:
            if (!(months >= 6 && months <= 18)) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", 1);

          case 8:
            return _context7.abrupt("return", 0);

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function calculateParticiaptionPoints(_x11) {
    return _ref7.apply(this, arguments);
  };
}();

exports.calculateParticiaptionPoints = calculateParticiaptionPoints;

var calculateBetweenDatesPoints = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(initialDate, finalDate) {
    var todaysDate;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            todaysDate = new Date();

            if (!(todaysDate <= finalDate && todaysDate >= initialDate)) {
              _context8.next = 5;
              break;
            }

            return _context8.abrupt("return", 1);

          case 5:
            return _context8.abrupt("return", 0);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function calculateBetweenDatesPoints(_x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

exports.calculateBetweenDatesPoints = calculateBetweenDatesPoints;