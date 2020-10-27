"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSaveValidations = onSaveValidations;

var _utils = require("../utils/utils");

var _messages = _interopRequireDefault(require("../utils/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onSaveValidations(subgenre) {
  isFormComplete(subgenre);
}

function isFormComplete(subgenre) {
  var subgenreRequiredFields = ["name"];
  if (subgenreRequiredFields.some(x => (0, _utils.isNullOrUndefinedOrEmpty)(subgenre[x]))) throw new SilmaError(406, _messages.default.IncompleteForm());
}