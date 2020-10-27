"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenreModel = exports.GenreSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GenreSchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  description: {
    type: String
  }
});
exports.GenreSchema = GenreSchema;
GenreSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var GenreModel = (0, _mongoose.model)("Genre", GenreSchema);
exports.GenreModel = GenreModel;