"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubgenreModel = exports.SubgenreSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

var _subgenre = require("../validations/subgenre.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SubgenreSchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  description: {
    type: String
  },
  genre: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Genre",
    required: "Genre is required"
  }
});
exports.SubgenreSchema = SubgenreSchema;
SubgenreSchema.plugin(_mongooseBeautifulUniqueValidation.default);
SubgenreSchema.pre("save", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (next) {
    (0, _subgenre.onSaveValidations)(this);
    next();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var SubgenreModel = (0, _mongoose.model)("Subgenre", SubgenreSchema);
exports.SubgenreModel = SubgenreModel;