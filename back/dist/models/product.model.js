"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductModel = exports.ProductSchema = void 0;

var _mongoose = require("mongoose");

var _mongooseBeautifulUniqueValidation = _interopRequireDefault(require("mongoose-beautiful-unique-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  stock: {
    type: Number
  },
  image: {
    type: String
  },
  link: {
    type: String
  },
  category: {
    type: String,
    enum: ["Book", "Merchandise"]
  },
  inventory: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Inventory"
  }
});
exports.ProductSchema = ProductSchema;
ProductSchema.plugin(_mongooseBeautifulUniqueValidation.default);
var ProductModel = (0, _mongoose.model)("Product", ProductSchema);
exports.ProductModel = ProductModel;