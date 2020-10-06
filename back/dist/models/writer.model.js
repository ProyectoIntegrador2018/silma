"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriterModel = exports.WriterSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WriterSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  pseudonym: {
    type: String,
    unique: "Pseudonym {VALUE} already registered as a writer"
  },
  isPlus: {
    type: Boolean,
    default: false
  }
});
exports.WriterSchema = WriterSchema;
WriterSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var WriterModel = (0, _mongoose.model)("Writer", WriterSchema);
exports.WriterModel = WriterModel;