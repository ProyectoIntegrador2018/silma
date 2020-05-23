"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nodemailer = require("nodemailer");

var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (request) {
    var transporter = nodemailer.createTransport({
      host: "tuna.exacthosting.com",
      port: 465,
      secure: true,
      auth: {
        user: "manuscritos@silmaed.com",
        pass: "Fr33fora11!"
      }
    });
    yield transporter.sendMail({
      from: "manuscritos@silmaed.com",
      to: request.email,
      subject: request.subject,
      text: request.text,
      html: request.html
    });
  });

  return function sendEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendEmail = sendEmail;