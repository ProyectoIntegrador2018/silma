"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryModel = exports.InventorySchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InventorySchema = new _mongoose.Schema({
  writer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Writer"
  },
  items: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
});
exports.InventorySchema = InventorySchema;
InventorySchema.plugin(_mongooseBeautifulUniqueValidation.default);
var InventoryModel = (0, _mongoose.model)("Inventory", InventorySchema);
exports.InventoryModel = InventoryModel;