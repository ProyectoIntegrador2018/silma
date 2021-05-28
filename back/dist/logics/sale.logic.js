"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchSales = searchSales;
exports.searchSalesByWriterId = searchSalesByWriterId;
exports.getSaleById = getSaleById;
exports.createSale = createSale;
exports.updateSale = updateSale;
exports.deleteSale = deleteSale;

var _sale = require("../models/sale.model");

var _inventory = require("../models/inventory.model");

var _writer = require("../models/writer.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function searchSales(_x) {
  return _searchSales.apply(this, arguments);
}

function _searchSales() {
  _searchSales = _asyncToGenerator(function* (query) {
    var sale = yield _sale.SaleModel.find().populate("event").populate("items.productId");
    return sale;
  });
  return _searchSales.apply(this, arguments);
}

function searchSalesByWriterId(_x2) {
  return _searchSalesByWriterId.apply(this, arguments);
}

function _searchSalesByWriterId() {
  _searchSalesByWriterId = _asyncToGenerator(function* (queryId) {
    console.log(queryId);
    var inventoryWriter = yield _writer.WriterModel.findOne({
      user: queryId
    });
    var sales = yield _sale.SaleModel.find().populate("event").populate("items.productId");
    var products = yield _inventory.InventoryModel.findOne({
      'writer': inventoryWriter
    }).populate("writer").populate("items");
    var auxId1 = "";
    var auxId2 = "";
    var auxProtuct = {
      title: "",
      writer: "",
      quantity: 0,
      total: 0,
      category: ""
    };
    var salesItems = [];

    for (var i = 0; i < products.items.length; i++) {
      auxProtuct.title = products.items[i].name;
      auxProtuct.writer = products.writer;
      auxProtuct.quantity = 0;
      auxProtuct.total = 0;
      auxProtuct.category = products.items[i].category;

      for (var j = 0; j < sales.length; j++) {
        for (var k = 0; k < sales[j].items.length; k++) {
          auxId1 = sales[j].items[k].productId._id;
          auxId2 = products.items[i]._id;
          var strinauxId1 = JSON.stringify(auxId1);
          var strinauxId2 = JSON.stringify(auxId2);

          if (strinauxId1 === strinauxId2) {
            auxProtuct.quantity = auxProtuct.quantity + sales[j].items[k].numberOfItems;
            auxProtuct.total = auxProtuct.total + sales[j].items[k].subtotal;
          }
        }
      }

      salesItems.push({
        title: auxProtuct.title,
        writer: auxProtuct.writer,
        quantity: auxProtuct.quantity,
        total: auxProtuct.total,
        category: auxProtuct.category
      });
    }

    return salesItems;
  });
  return _searchSalesByWriterId.apply(this, arguments);
}

function getSaleById(_x3) {
  return _getSaleById.apply(this, arguments);
}

function _getSaleById() {
  _getSaleById = _asyncToGenerator(function* (saleId) {
    var sale = yield _sale.SaleModel.findById(saleId);
    return sale;
  });
  return _getSaleById.apply(this, arguments);
}

function createSale(_x4) {
  return _createSale.apply(this, arguments);
}

function _createSale() {
  _createSale = _asyncToGenerator(function* (sale) {
    var newSaleModel = new _sale.SaleModel(sale);
    var newSale = yield newSaleModel.save();
    return newSale;
  });
  return _createSale.apply(this, arguments);
}

function updateSale(_x5, _x6) {
  return _updateSale.apply(this, arguments);
}

function _updateSale() {
  _updateSale = _asyncToGenerator(function* (id, sale) {
    var saleModel = yield _sale.SaleModel.findById(id);
    var updatedSaleModel = Object.assign(saleModel, sale);
    var updatedSale = yield updatedSaleModel.save();
    return updatedSale;
  });
  return _updateSale.apply(this, arguments);
}

function deleteSale(_x7) {
  return _deleteSale.apply(this, arguments);
}

function _deleteSale() {
  _deleteSale = _asyncToGenerator(function* (id) {
    var saleToDelete = yield _sale.SaleModel.findById(id);
    var deletedSale = yield saleToDelete.deleteOne();
    return deletedSale;
  });
  return _deleteSale.apply(this, arguments);
}