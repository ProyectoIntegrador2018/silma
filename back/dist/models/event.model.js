"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventModel = exports.EventSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventSchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  description: {
    type: String
  },
  place: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  }
});
exports.EventSchema = EventSchema;
EventSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var EventModel = (0, _mongoose.model)("Event", EventSchema);
exports.EventModel = EventModel;