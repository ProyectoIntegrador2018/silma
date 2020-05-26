"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rejectText = exports.getTextsOfWriter = exports.retrieveTextDocument = exports.uploadTextDocument = exports.createText = exports.getTextsInPhase = exports.getText = exports.getAllTexts = void 0;

var _errors = require("../utils/errors");

var _writer = require("../models/writer.model");

var _text = require("../models/text.model");

var _suggestion = require("./suggestion.controller");

var _mailSender = require("../utils/mailSender");

var _aws = require("./aws.controller");

var _user = require("../models/user.model");

var _emails = require("../utils/emails");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllTexts = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var readers = yield _text.TextModel.find().populate("genres");
    return readers;
  }));
};

exports.getAllTexts = getAllTexts;

var getText = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var reader = yield _text.TextModel.findById(id).populate("genres");
    return reader;
  }));
};

exports.getText = getText;

var getTextsInPhase = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      phase
    } = request.params;
    var reader = yield _text.TextModel.find({
      phase
    }).populate("genres");
    return reader;
  }));
};

exports.getTextsInPhase = getTextsInPhase;

var createText = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var data = request.body;
    var text = yield _text.TextModel.create(data);
    var user = yield _writer.WriterModel.findById(text.writer).populate("user");
    var email = user.user.email;

    if (text._id) {
      yield (0, _suggestion.assignReaders)(text, 3);
      var emailData = (0, _emails.bookReceivedEmail)(text);
      yield (0, _mailSender.sendEmail)(_objectSpread({}, emailData, {
        email: email
      }));
    }

    return text;
  }));
};

exports.createText = createText;

var uploadTextDocument = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var document = request.files.document;
    (0, _aws.uploadDocument)(id + ".md", document.data);
  }));
};

exports.uploadTextDocument = uploadTextDocument;

var retrieveTextDocument = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    try {
      var {
        id
      } = request.params;
      var book = yield (0, _aws.getDocument)(id);
      return {
        "message": book.Body.toString()
      };
    } catch (err) {
      response.status(404).send({
        message: 'File does not exist'
      });
    }
  }));
};

exports.retrieveTextDocument = retrieveTextDocument;

var getTextsOfWriter = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      writer
    } = request.params;
    var reader = yield _text.TextModel.find({
      writer
    }).populate("genres");
    return reader;
  }));
};

exports.getTextsOfWriter = getTextsOfWriter;

var rejectText = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    yield _text.TextModel.updateOne({
      _id: id
    }, {
      isRejected: true
    });
    var text = yield _text.TextModel.findById(id).populate("writer");
    var user = yield _user.UserModel.findById(text.writer.user);
    var document = request.files.document;
    var emailData = (0, _emails.rejectTextEmail)(user, text);
    yield (0, _mailSender.sendEmail)(_objectSpread({}, emailData, {
      email: user.email,
      attachments: [{
        filename: document.name,
        content: document.data
      }]
    }));
    return text;
  }));
};

exports.rejectText = rejectText;