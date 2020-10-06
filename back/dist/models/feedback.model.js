"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackModel = exports.FeedbackSchema = void 0;

var _mongoose = require("mongoose");

var _validators = require("../utils/validators");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedbackSchema = new _mongoose.Schema({
  suggestion: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Suggestion"
  },
  reader: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Reader"
  },
  selectedGenres: {
    type: [{
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Genre"
    }],
    validate: [(0, _validators.minLengthRule)(3), "Preferences must have at least 3 genres."]
  },
  publish: {
    type: String
  },
  page: {
    type: Number
  },
  grade: {
    type: Number
  },
  badCharacter: {
    type: String
  },
  goodCharacter: {
    type: String
  },
  liked: {
    type: String
  },
  disliked: {
    type: String
  }
});
exports.FeedbackSchema = FeedbackSchema;
FeedbackSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var FeedbackModel = (0, _mongoose.model)("Feedback", FeedbackSchema);
exports.FeedbackModel = FeedbackModel;