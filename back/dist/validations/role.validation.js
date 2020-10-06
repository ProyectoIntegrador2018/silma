"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSaveMiddleware = onSaveMiddleware;
exports.onSaveValidation = onSaveValidation;

var _utils = require("../utils/utils");

var _messages = _interopRequireDefault(require("../utils/messages"));

var _errors = require("../utils/errors");

var _role = _interopRequireDefault(require("../models/role.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function onSaveMiddleware(req, res, next) {
  (0, _errors.handleSyncRequest)(() => {
    var role = req.body;
    isFormComplete(role);
  }, next);
}

function onSaveValidation(_x) {
  return _onSaveValidation.apply(this, arguments);
}

function _onSaveValidation() {
  _onSaveValidation = _asyncToGenerator(function* (role) {
    yield allFieldsUnique(role);
  });
  return _onSaveValidation.apply(this, arguments);
}

function isFormComplete(role) {
  var requiredProperties = ["name"];

  if (requiredProperties.some(x => (0, _utils.isNullOrUndefinedOrEmpty)(role[x]))) {
    throw new _errors.SilmaError(406, _messages.default.IncompleteForm());
  }
}

function allFieldsUnique(_x2) {
  return _allFieldsUnique.apply(this, arguments);
}
/**
 * @todo Function to validate that the Role is not assigned to any user
 */


function _allFieldsUnique() {
  _allFieldsUnique = _asyncToGenerator(function* (role) {
    var {
      _id,
      name,
      code
    } = role;
    var roleModel = yield _role.default.findOne({
      _id: {
        $ne: _id
      },
      $or: [{
        code
      }, {
        name
      }]
    });

    if (roleModel) {
      var repeatedField = roleModel.code === code ? "Código" : "Nombre";
      throw new _errors.SilmaError(406, _messages.default.DuplicatedValue(repeatedField));
    }
  });
  return _allFieldsUnique.apply(this, arguments);
}