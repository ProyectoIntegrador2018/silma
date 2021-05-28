"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaleModel = exports.SaleSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SaleSchema = new _mongoose.Schema({
  createdBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  event: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  items: [{
    productId: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    name: String,
    price: Number,
    numberOfItems: Number,
    subtotal: Number
  }],
  total: {
    type: Number,
    required: true
  },
  date: {
    type: String
  }
});
exports.SaleSchema = SaleSchema;
SaleSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var SaleModel = (0, _mongoose.model)("Sale", SaleSchema);
exports.SaleModel = SaleModel;