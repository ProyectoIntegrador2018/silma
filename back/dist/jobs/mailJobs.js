"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startMailJobs = startMailJobs;

var _mailSender = require("../utils/mailSender");

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _suggestion = require("../models/suggestion.model");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _reader = require("../models/reader.model");

var _user = require("../models/user.model");

var _text = require("../models/text.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function startMailJobs() {
  sendReminderMailToReaders();
}

function sendReminderMailToReaders() {
  _nodeCron.default.schedule("0 0 * * *", /*#__PURE__*/_asyncToGenerator(function* () {
    try {
      // Suggestions sent two weeks or more ago
      var suggestions = yield _suggestion.SuggestionModel.find({
        sentDate: {
          $lte: (0, _momentTimezone.default)().subtract(2, "weeks").toDate()
        },
        suggestionStatus: "Pending"
      });

      if (suggestions.length > 0) {
        var sendMailPromises = suggestions.map( /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(function* (x) {
            var reader = yield _reader.ReaderModel.findById(x.reader);

            var userPromise = _user.UserModel.findById(reader.user);

            var textPromise = _text.TextModel.findById(x.text);

            var [text, user] = yield Promise.all([textPromise, userPromise]);
            var mailData = {
              email: user.email,
              subject: "Recordatorio de lectura"
            };
            yield (0, _mailSender.sendEmail)(mailData, "reading_remainder", {
              readerName: user.name,
              book: text.title
            });
            console.log("EMAIL SENT TO ".concat(user.email));
          });

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());
        yield Promise.all(sendMailPromises);
      } else console.log("NO USER WITH SUGGESTIONS NOT READ WITH TWO WEEKS OR MORE.");
    } catch (error) {
      console.error(error);
    }
  }));
}