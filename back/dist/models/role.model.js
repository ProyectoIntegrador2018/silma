"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RoleSchema = void 0;

var _mongoose = require("mongoose");

var _role = require("../validations/role.validation");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var RoleSchema = new _mongoose.Schema({
  code: {
    type: String,
    required: "Code is required"
  },
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  isBaseRole: {
    type: Boolean,
    default: false
  },
  readingRead: {
    type: Boolean,
    default: false
  },
  readingCreate: {
    type: Boolean,
    default: false
  },
  readingEdit: {
    type: Boolean,
    default: false
  },
  readingDelete: {
    type: Boolean,
    default: false
  },
  bookRead: {
    type: Boolean,
    default: false
  },
  bookCreate: {
    type: Boolean,
    default: false
  },
  bookEdit: {
    type: Boolean,
    default: false
  },
  bookDelete: {
    type: Boolean,
    default: false
  },
  phaseRead: {
    type: Boolean,
    default: false
  },
  phaseCreate: {
    type: Boolean,
    default: false
  },
  phaseEdit: {
    type: Boolean,
    default: false
  },
  phaseDelete: {
    type: Boolean,
    default: false
  },
  userRead: {
    type: Boolean,
    default: false
  },
  userCreate: {
    type: Boolean,
    default: false
  },
  userEdit: {
    type: Boolean,
    default: false
  },
  userDelete: {
    type: Boolean,
    default: false
  },
  eventRead: {
    type: Boolean,
    default: false
  },
  eventCreate: {
    type: Boolean,
    default: false
  },
  eventEdit: {
    type: Boolean,
    default: false
  },
  eventDelete: {
    type: Boolean,
    default: false
  },
  reportRead: {
    type: Boolean,
    default: false
  },
  reportCreate: {
    type: Boolean,
    default: false
  },
  reportEdit: {
    type: Boolean,
    default: false
  },
  reportDelete: {
    type: Boolean,
    default: false
  },
  roleRead: {
    type: Boolean,
    default: false
  },
  roleCreate: {
    type: Boolean,
    default: false
  },
  roleEdit: {
    type: Boolean,
    default: false
  },
  roleDelete: {
    type: Boolean,
    default: false
  },
  genreRead: {
    type: Boolean,
    default: false
  },
  genreCreate: {
    type: Boolean,
    default: false
  },
  genreEdit: {
    type: Boolean,
    default: false
  },
  genreDelete: {
    type: Boolean,
    default: false
  }
});
exports.RoleSchema = RoleSchema;
RoleSchema.pre("save", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (next) {
    yield (0, _role.onSaveValidation)(this);
    next();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
RoleSchema.pre("remove", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (next) {
    yield (0, _role.onDeleteValidation)(this);
    next();
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
var RoleModel = (0, _mongoose.model)("Role", RoleSchema);
var _default = RoleModel;
exports.default = _default;