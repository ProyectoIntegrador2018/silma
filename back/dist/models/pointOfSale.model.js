"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointOfSaleModel = exports.PointOfSaleSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PointOfSaleSchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  place: {
    type: String
  },
  url: {
    type: String
  },
  description: {
    type: String
  }
});
exports.PointOfSaleSchema = PointOfSaleSchema;
PointOfSaleSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var PointOfSaleModel = (0, _mongoose.model)("PointOfSale", PointOfSaleSchema);
exports.PointOfSaleModel = PointOfSaleModel;