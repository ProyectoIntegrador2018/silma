"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminModel = exports.AdminSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdminSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // This role defines the access level of the admin
  role: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }
});
exports.AdminSchema = AdminSchema;
AdminSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var AdminModel = (0, _mongoose.model)("Admin", AdminSchema);
exports.AdminModel = AdminModel;