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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Response with all texts with their genres.
var getAllTexts = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var readers = yield _text.TextModel.find().populate("genres").populate("writer");
    return readers;
  }));
}; // Response with a particular text based on its id.


exports.getAllTexts = getAllTexts;

var getText = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var reader = yield _text.TextModel.find({
      _id: id
    }).populate("genres");
    return reader;
  }));
}; // Response with all texts in a particul current phase.


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
}; // Creates a text and sends an email to the writer.


exports.getTextsInPhase = getTextsInPhase;

var createText = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var data = request.body;
    var text = yield _text.TextModel.create(data);
    var user = yield _writer.WriterModel.findById(text.writer).populate("user");
    var email = user.user.email;

    if (text._id) {
      yield (0, _suggestion.assignReaders)(text, 3);
      yield (0, _mailSender.sendEmail)({
        subject: "Enviaste tu texto para que sea dictaminado.",
        email: email
      }, "received", {
        title: text.title,
        name: user.user.name
      });
    }

    return text;
  }));
}; // Uploads to aws the text document of a particular text.


exports.createText = createText;

var uploadTextDocument = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var document = request.files.document;
    (0, _aws.uploadDocument)(id + ".md", document.data);
  }));
}; // Response with the text document of a particular text.


exports.uploadTextDocument = uploadTextDocument;

var retrieveTextDocument = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    try {
      var {
        id
      } = request.params;
      var book = yield (0, _aws.getDocument)(id);
      return {
        message: book.Body.toString()
      };
    } catch (err) {
      response.status(404).send({
        message: "File does not exist"
      });
    }
  }));
}; // Response with all the texts of a particular writer.


exports.retrieveTextDocument = retrieveTextDocument;

var getTextsOfWriter = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      writer
    } = request.params;
    var writerText = yield _writer.WriterModel.findOne({
      user: writer
    });
    var writerID = writerText._id;
    var texts = yield _text.TextModel.find({
      writer: writerID
    }).populate("genres").populate("writer");
    return texts;
  }));
}; // Rejects a particular text and sends an email to the writer with a pdf file.


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
    var document = request.files.document; // Email with pdf file

    yield (0, _mailSender.sendEmail)({
      email: user.email,
      subject: "No se aprobó tu texto",
      attachments: [{
        filename: document.name,
        content: document.data
      }]
    }, "rejected", {
      title: text.title,
      name: user.name
    });
    return text;
  }));
};

exports.rejectText = rejectText;