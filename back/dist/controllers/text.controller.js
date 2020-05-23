"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextsOfWriter = exports.retrieveTextDocument = exports.uploadTextDocument = exports.createText = exports.getTextsInPhase = exports.getText = exports.getAllTexts = void 0;

var _errors = require("../utils/errors");

var _text = require("../models/text.model");

var _suggestion = require("./suggestion.controller");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllTexts = function getAllTexts(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var readers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _text.TextModel.find().populate("genres");

          case 2:
            readers = _context.sent;
            return _context.abrupt("return", readers);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

exports.getAllTexts = getAllTexts;

var getText = function getText(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var id, reader;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = request.params.id;
            _context2.next = 3;
            return _text.TextModel.findById(id).populate("genres");

          case 3:
            reader = _context2.sent;
            return _context2.abrupt("return", reader);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
};

exports.getText = getText;

var getTextsInPhase = function getTextsInPhase(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var phase, reader;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            phase = request.params.phase;
            _context3.next = 3;
            return _text.TextModel.find({
              phase: phase
            }).populate("genres");

          case 3:
            reader = _context3.sent;
            return _context3.abrupt("return", reader);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
};

exports.getTextsInPhase = getTextsInPhase;

var createText = function createText(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var data, text;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = request.body;
            _context4.next = 3;
            return _text.TextModel.create(data);

          case 3:
            text = _context4.sent;

            if (!text._id) {
              _context4.next = 7;
              break;
            }

            _context4.next = 7;
            return (0, _suggestion.assignReaders)(text, 3);

          case 7:
            return _context4.abrupt("return", text);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
};

exports.createText = createText;

var uploadTextDocument = function uploadTextDocument(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var id, documentPath, text;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = request.params.id;
            documentPath = "texts/".concat(id, "/uploads");
            _context5.next = 4;
            return _text.TextModel.updateOne({
              _id: id
            }, {
              $set: {
                documentPath: documentPath
              }
            });

          case 4:
            text = _context5.sent;
            return _context5.abrupt("return", text);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
};

exports.uploadTextDocument = uploadTextDocument;

var retrieveTextDocument = function retrieveTextDocument(request, response) {
  try {
    var id = request.params.id;
    response.sendFile("public/uploads/texts/".concat(id, ".md"), {
      root: '.'
    });
  } catch (err) {
    response.status(404).send({
      message: 'File does not exist'
    });
  }
};

exports.retrieveTextDocument = retrieveTextDocument;

var getTextsOfWriter = function getTextsOfWriter(request, response) {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var writer, reader;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            writer = request.params.writer;
            _context6.next = 3;
            return _text.TextModel.find({
              writer: writer
            }).populate("genres");

          case 3:
            reader = _context6.sent;
            return _context6.abrupt("return", reader);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
};

exports.getTextsOfWriter = getTextsOfWriter;