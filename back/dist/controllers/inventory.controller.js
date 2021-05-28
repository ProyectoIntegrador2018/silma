"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInventory = exports.getInventoryByWriterId = exports.getInventory = exports.getInventories = void 0;

var _inventory = require("../models/inventory.model");

var _errors = require("../utils/errors");

var _writer = require("../models/writer.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Obtiene todos los inventarios
var getInventories = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var inventories = yield _inventory.InventoryModel.find().populate("writer").populate("items");
    return inventories;
  }));
}; //Obtiene un inventario por su id


exports.getInventories = getInventories;

var getInventory = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var inventory = yield _inventory.InventoryModel.findById(id).populate("writer").populate("items");
    return inventory;
  }));
}; //Obtiene un inventario especifico por el id del escritor


exports.getInventory = getInventory;

var getInventoryByWriterId = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      writerId
    } = request.params;
    var inventoryWriter = yield _writer.WriterModel.findOne({
      user: writerId
    });
    var inventory = yield _inventory.InventoryModel.findOne({
      'writer': inventoryWriter
    }).populate("writer").populate("items");
    return inventory;
  }));
}; //Funcion que crea un usuario y lector que no está registrado


exports.getInventoryByWriterId = getInventoryByWriterId;

var createInventory = (request, response, item) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      writerId
    } = request.query;

    try {
      var inventoryWriter = yield _writer.WriterModel.findOne({
        user: writerId
      });
      var inventory = yield _inventory.InventoryModel.findOne({
        writer: inventoryWriter
      });

      if (!inventory) {
        var inventoryData = {
          writer: inventoryWriter._id,
          items: []
        };
        var newInventory = yield _inventory.InventoryModel.create(inventoryData);
        newInventory.writer = inventoryWriter;
        return newInventory;
      } else {
        throw {
          error: "This user has already an inventory"
        };
      }
    } catch (error) {
      console.log(error);
      throw {
        error: "Error creating inventory"
      };
    }
  }));
};

exports.createInventory = createInventory;