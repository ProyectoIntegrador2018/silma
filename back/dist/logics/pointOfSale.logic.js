"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPoS = searchPoS;
exports.getPoSById = getPoSById;
exports.createPoS = createPoS;
exports.updatePoS = updatePoS;
exports.deletePoS = deletePoS;

var _pointOfSale = require("../models/pointOfSale.model");

var PointOfSaleValidation = _interopRequireWildcard(require("../validations/pointOfSale.validation"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function searchPoS(_x) {
  return _searchPoS.apply(this, arguments);
}

function _searchPoS() {
  _searchPoS = _asyncToGenerator(function* (query) {
    var poS = yield _pointOfSale.PointOfSaleModel.find();
    return poS;
  });
  return _searchPoS.apply(this, arguments);
}

function getPoSById(_x2) {
  return _getPoSById.apply(this, arguments);
}

function _getPoSById() {
  _getPoSById = _asyncToGenerator(function* (poSId) {
    var poS = yield _pointOfSale.PointOfSaleModel.findById(poSId);
    return poS;
  });
  return _getPoSById.apply(this, arguments);
}

function createPoS(_x3) {
  return _createPoS.apply(this, arguments);
}

function _createPoS() {
  _createPoS = _asyncToGenerator(function* (poS) {
    var newPoSModel = new _pointOfSale.PointOfSaleModel(poS);
    var newPoS = yield newPoSModel.save();
    return newPoS;
  });
  return _createPoS.apply(this, arguments);
}

function updatePoS(_x4, _x5) {
  return _updatePoS.apply(this, arguments);
}

function _updatePoS() {
  _updatePoS = _asyncToGenerator(function* (id, poS) {
    var poSModel = yield _pointOfSale.PointOfSaleModel.findById(id);
    var updatedPoSModel = Object.assign(poSModel, poS);
    var updatedPoS = yield updatedPoSModel.save();
    return updatedPoS;
  });
  return _updatePoS.apply(this, arguments);
}

function deletePoS(_x6) {
  return _deletePoS.apply(this, arguments);
}

function _deletePoS() {
  _deletePoS = _asyncToGenerator(function* (id) {
    var poSToDelete = yield _pointOfSale.PointOfSaleModel.findById(id); // Validate genre delete

    yield PointOfSaleValidation.onDeleteValidations(poSToDelete);
    var deletedPoS = yield poSToDelete.deleteOne();
    return deletedPoS;
  });
  return _deletePoS.apply(this, arguments);
}