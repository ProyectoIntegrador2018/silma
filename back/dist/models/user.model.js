"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = exports.UserSchema = void 0;

var _mongoose = require("mongoose");

var _validators = require("../utils/validators");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: "Name is required"
  },
  password: {
    type: String,
    select: false,
    required: "Password is required"
  },
  email: {
    type: String,
    required: "Email address is required",
    unique: "User with email {VALUE} already registered",
    index: true,
    validate: [_validators.validateEmail, "Invalid email address"]
  },
  birthdate: {
    type: Date,
    required: "Date of birth is required"
  },
  phone: {
    type: String,
    required: "Phone is required",
    validate: [_validators.validatePhone, "Invalid phone"]
  },
  nationality: {
    type: String,
    required: "Nationality is required"
  },
  roles: [{
    type: String,
    enums: ["admin", "writer", "reader"],
    default: []
  }]
});
exports.UserSchema = UserSchema;
UserSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var UserModel = (0, _mongoose.model)("User", UserSchema);
exports.UserModel = UserModel;