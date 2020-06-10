"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _emailTemplates = _interopRequireDefault(require("email-templates"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var templatesDir = _path.default.resolve(__dirname, '../email-templates'); // Sends an email from a specified template and some data.
// At request provide both the email and the subject.


var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (request, htmlFile, data) {
    // Gets html template and fills it with the provided data.
    var email = new _emailTemplates.default({
      views: {
        root: templatesDir,
        options: {
          extension: 'hbs'
        }
      }
    });
    var html = yield email.render(htmlFile, data); // Sends the email.

    var transporter = _nodemailer.default.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    yield transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: request.email,
      subject: request.subject,
      html: html,
      attachments: request.attachments
    });
  });

  return function sendEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendEmail = sendEmail;