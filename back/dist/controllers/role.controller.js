"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = getById;
exports.list = list;
exports.create = create;
exports.update = update;
exports.deleteRole = deleteRole;

var _errors = require("../utils/errors");

var RoleLogic = _interopRequireWildcard(require("../logics/role.logic"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getById(req, res) {
  (0, _errors.send)(res, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = req.params;
    var role = yield RoleLogic.getById(id);
    return role;
  }));
}

function list(req, res) {
  (0, _errors.send)(res, /*#__PURE__*/_asyncToGenerator(function* () {
    var roles = yield RoleLogic.list();
    return roles;
  }));
}

function create(req, res) {
  (0, _errors.send)(res, /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* (session) {
      var role = req.body;
      var newRole = yield RoleLogic.create(role, session);
      return newRole;
    });

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
}

function update(req, res) {
  (0, _errors.send)(res, /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(function* (session) {
      var role = req.body;
      var updatedRole = yield RoleLogic.update(role, session);
      return updatedRole;
    });

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }());
}

function deleteRole(req, res) {
  (0, _errors.send)(res, /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(function* (session) {
      var {
        id
      } = req.params;
      var deletedRole = yield RoleLogic.deleteRole(id, session);
      return deletedRole;
    });

    return function (_x3) {
      return _ref5.apply(this, arguments);
    };
  }());
}