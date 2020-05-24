"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextsOfWriter = exports.retrieveTextDocument = exports.uploadTextDocument = exports.createText = exports.getTextsInPhase = exports.getText = exports.getAllTexts = void 0;

var _errors = require("../utils/errors");

var _text = require("../models/text.model");

var _suggestion = require("./suggestion.controller");

var _aws = require("./aws.controller");

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

    if (text._id) {
      yield (0, _suggestion.assignReaders)(text, 3);
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