"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = getById;
exports.list = list;
exports.create = create;
exports.update = update;
exports.deleteRole = deleteRole;

var _role = _interopRequireDefault(require("../models/role.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getById(_x) {
  return _getById.apply(this, arguments);
}

function _getById() {
  _getById = _asyncToGenerator(function* (id) {
    var role = yield _role.default.findById(id);
    return role;
  });
  return _getById.apply(this, arguments);
}

function list() {
  return _list.apply(this, arguments);
}

function _list() {
  _list = _asyncToGenerator(function* () {
    var roles = yield _role.default.find();
    return roles;
  });
  return _list.apply(this, arguments);
}

function create(_x2, _x3) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator(function* (role, session) {
    var newRole = new _role.default(role);
    var newRoleDoc = yield newRole.save();
    return newRoleDoc;
  });
  return _create.apply(this, arguments);
}

function update(_x4, _x5) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(function* (role, session) {
    var oldRole = yield _role.default.findById(role._id);
    var updatedRole = Object.assign(oldRole, role);
    yield updatedRole.save();
    return updatedRole;
  });
  return _update.apply(this, arguments);
}

function deleteRole(_x6, _x7) {
  return _deleteRole.apply(this, arguments);
}

function _deleteRole() {
  _deleteRole = _asyncToGenerator(function* (id, session) {
    var deletedRole = yield _role.default.deleteOne({
      _id: id
    });
    return deletedRole;
  });
  return _deleteRole.apply(this, arguments);
}