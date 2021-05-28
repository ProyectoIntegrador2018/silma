"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.retrieveImage = exports.editProduct = exports.deleteProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;

var _product = require("../models/product.model");

var _errors = require("../utils/errors");

var _inventory = require("../models/inventory.model");

var _config = _interopRequireDefault(require("../config/config"));

var _aws = require("./aws.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AWS = require("aws-sdk");

//Obtiene todos los productos
var getProducts = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var products = yield _product.ProductModel.find().populate({
      path: 'inventory',
      populate: {
        path: 'writer'
      }
    });
    return products;
  }));
}; //Obtiene un producto por su id


exports.getProducts = getProducts;

var getProduct = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var product = yield _product.ProductModel.findById(id);
    return product;
  }));
}; //Funcion que crea un usuario y lector que no está registrado


exports.getProduct = getProduct;

var createProduct = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      inventoryId
    } = request.query;

    var data = _objectSpread({}, request.body, {
      inventory: inventoryId
    });

    console.log(inventoryId);

    try {
      var newProduct = yield _product.ProductModel.create(data);

      if (inventoryId) {
        var inventory = yield _inventory.InventoryModel.findOne({
          _id: inventoryId
        });
        inventory.items.push(newProduct);
        inventory.save();
        console.log(inventory);
      }

      return newProduct;
    } catch (error) {
      console.log(error);
      throw {
        error: "Error adding items"
      };
    }
  }));
}; //Funcion que borra un item a un inventario


exports.createProduct = createProduct;

var deleteProduct = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id,
      inventoryId
    } = request.query;
    console.log(request.query);

    try {
      var product = yield _product.ProductModel.findByIdAndRemove(id);

      if (inventoryId) {
        var inventory = yield _inventory.InventoryModel.findOne({
          _id: inventoryId
        });
        inventory.items = inventory.items.filter(item => item._id != id);
        inventory.save();
      }

      return product;
    } catch (_unused) {
      throw {
        error: "Error deleting item"
      };
    }
  }));
}; //Funcion que agrega items a un inventario


exports.deleteProduct = deleteProduct;

var editProduct = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.query;
    var data = request.body;

    try {
      var product = yield _product.ProductModel.findById(id);
      product.name = data.name;
      product.description = data.description;
      product.price = data.price;
      product.stock = data.stock;
      product.image = data.image;
      product.link = data.link;
      product.category = data.category;
      product.save();
      return product;
    } catch (_unused2) {
      throw {
        error: "Error editing item"
      };
    }
  }));
}; // Response with the text document of a particular text.


exports.editProduct = editProduct;

var retrieveImage = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    try {
      var {
        id
      } = request.params;
      console.log(id);
      var image = yield (0, _aws.getImage)(id);
      var data = Buffer.from(image.Body).toString('base64');
      return {
        file: data
      };
    } catch (err) {
      response.status(404).send({
        message: "File does not exist"
      });
    }
  }));
}; // Uploads to aws the text document of a particular text.


exports.retrieveImage = retrieveImage;

var uploadImage = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;

    try {
      var s3 = new AWS.S3({
        credentials: {
          secretAccessKey: _config.default.AWS_SECRET_ACCESS_KEY,
          accessKeyId: _config.default.AWS_ACCESS_KEY_ID
        },
        params: {
          Bucket: _config.default.AWS_BUCKET + "/Images",
          Key: "",
          Body: ""
        }
      });
      console.log(s3);
      var fileN;
      var image = request.files.image;
      console.log(image); // Setting up S3 upload parameters

      fileN = id + '.png';
      var params = {
        Key: fileN,
        // File name you want to save as in S3
        Body: image.data
      };
      s3.upload(params, /*#__PURE__*/function () {
        var _ref8 = _asyncToGenerator(function* (err, data) {
          if (err) {
            throw err;
          }

          console.log("File uploaded successfully. ".concat(data.Location));
          var product = yield _product.ProductModel.findById(id);
          product.image = fileN;
          product.save();
        });

        return function (_x, _x2) {
          return _ref8.apply(this, arguments);
        };
      }());
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }));
};

exports.uploadImage = uploadImage;