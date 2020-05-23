"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReaderModel = exports.ReaderSchema = void 0;

var _mongoose = require("mongoose");

var _validators = require("../utils/validators");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReaderSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  facebookLink: {
    type: String,
    validate: [_validators.validateURL, "Invalid URL"]
  },
  readingProficiency: {
    type: String,
    enum: ["3 or less", "4 to 6", "7 or more"],
    default: "4 to 6"
  },
  preferences: {
    type: [{
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Genre"
    }],
    validate: [(0, _validators.minLengthRule)(3), "Preferences must have at least 3 genres."]
  },
  recommended: {
    type: String,
    required: "How do you know Silma",
    default: "Nadie / Otra persona"
  },
  readFrom: {
    type: Date,
    required: "Availability to read from"
  },
  readTill: {
    type: Date,
    required: "Availability to read till"
  },
  //Futuro sprint 3
  lastReview: {
    type: Date,
    default: Date.now
  }
});
exports.ReaderSchema = ReaderSchema;
ReaderSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var ReaderModel = (0, _mongoose.model)("Reader", ReaderSchema);
exports.ReaderModel = ReaderModel;