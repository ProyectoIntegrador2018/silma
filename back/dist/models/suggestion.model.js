"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionModel = exports.SuggestionSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SuggestionSchema = new _mongoose.Schema({
  reader: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Reader'
  },
  text: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Text'
  },
  sentDate: {
    type: Date
  },

  /* Status can be set to Pending, Rejected, Accepted, Completed etc */
  suggestionStatus: {
    type: String
  },
  score: {
    type: Number
  }
});
exports.SuggestionSchema = SuggestionSchema;
SuggestionSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var SuggestionModel = (0, _mongoose.model)("Suggestion", SuggestionSchema);
exports.SuggestionModel = SuggestionModel;