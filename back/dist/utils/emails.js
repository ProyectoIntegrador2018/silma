"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movePhaseEmail = exports.bookReceivedEmail = exports.rejectTextEmail = void 0;

var rejectTextEmail = (user, text) => {
  return {
    subject: "Tu libro ha sido rechazado",
    html: "\n    <div>\n      Buenas tardes ".concat(user.name, ".\n      <br>\n      Lamentamos informarle que su libro ").concat(text.title, " ha sido rechazado.\n      <br>\n      Le adjuntamos un PDF con la explicacion de porque su texto fue rechazado\n    </div>\n    ")
  };
};

exports.rejectTextEmail = rejectTextEmail;

var bookReceivedEmail = text => {
  return {
    subject: "New Silma Reading Suggestion!",
    html: "\n                    <div>\n                        <div>\xA1Hola!</div>\n                        <div> Muchas gracias por el env\xEDo de tu libro, te haremos saber el proceso de tu libro conforme ocurre </div>\n                    </div>           \n             "
  };
};

exports.bookReceivedEmail = bookReceivedEmail;
var movePhaseEmail = [{
  "email": "",
  "subject": "",
  "text": "",
  "html": "\n            <div>\n                <div>\xA1Hola!</div>\n                <div>\n                Te informamors que varios lectores aprobaron tu texto y avanzara a fase 2.\n                </div>\n                <div>\n                Muchas felicidades, Equipo Silma\n                </div>\n                </span>\n            </div>\n        "
}, {
  "email": "",
  "subject": "",
  "text": "",
  "html": "\n            <div>\n                <div>\xA1Hola!</div>\n                <div>\n                Te informamors que varios lectores aprobaron tu texto y avanzara a fase 3.\n                </div>\n                <div>\n                Muchas felicidades, Equipo Silma\n                </div>\n                </span>\n            </div>\n        "
}, {
  "email": "",
  "subject": "Tu texto ha sido avanzado de fase!",
  "text": "",
  "html": "\n            <div>\n                <div>\xA1Hola!</div>\n                <div>\n                Te informamors que varios lectores aprobaron tu texto y avanzara a fase 4.\n                </div>\n                <div>\n                Muchas felicidades, Equipo Silma\n                </div>\n                </span>\n            </div>\n        "
}];
exports.movePhaseEmail = movePhaseEmail;