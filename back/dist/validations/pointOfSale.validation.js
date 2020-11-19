"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSaveMiddleware = onSaveMiddleware;
exports.onDeleteValidations = onDeleteValidations;

var _utils = require("../utils/utils");

var _messages = _interopRequireDefault(require("../utils/messages"));

var _errors = require("../utils/errors");

var _feedback = require("../models/feedback.model");

var _reader = require("../models/reader.model");

var _text = require("../models/text.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function onSaveMiddleware(req, res, next) {
  (0, _errors.handleSyncRequest)(() => {
    var pointOfSale = req.body;
    isFormComplete(pointOfSale);
  }, next);
}

function onDeleteValidations(_x) {
  return _onDeleteValidations.apply(this, arguments);
}

function _onDeleteValidations() {
  _onDeleteValidations = _asyncToGenerator(function* (pointOfSale) {
    yield isRelatedToSomething(pointOfSale);
  });
  return _onDeleteValidations.apply(this, arguments);
}

function isFormComplete(pointOfSale) {
  var pointOfSaleRequiredFields = ["name"];
  if (pointOfSaleRequiredFields.some(x => (0, _utils.isNullOrUndefinedOrEmpty)(pointOfSale[x]))) throw new _errors.SilmaError(406, _messages.default.IncompleteForm());
}

function isRelatedToSomething(_x2) {
  return _isRelatedToSomething.apply(this, arguments);
}

function _isRelatedToSomething() {
  _isRelatedToSomething = _asyncToGenerator(function* (pointOfSale) {
    var feedbackPromise = _feedback.FeedbackModel.findOne({
      selectedGenres: pointOfSale._id
    });

    var readerPromise = _reader.ReaderModel.findOne({
      preferences: pointOfSale._id
    });

    var textPromise = _text.TextModel.findOne({
      pointOfSale: pointOfSale._id
    });

    var [feedback, reader, text] = yield Promise.all([feedbackPromise, readerPromise, textPromise]);
    if (feedback) throw new _errors.SilmaError(405, "No se puede eliminar el punto de venta porque esta relacionado a alguna reseña.");
    if (reader) throw new _errors.SilmaError(405, "No se puede eliminar el punto de venta porque esta relacionado a algún lector.");
    if (text) throw new _errors.SilmaError(405, "No se puede eliminar el punto de venta porque esta relacionado a algún texto.");
  });
  return _isRelatedToSomething.apply(this, arguments);
}