"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchEvent = searchEvent;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;

var _event = require("../models/event.model");

var EventValidation = _interopRequireWildcard(require("../validations/event.validation"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function searchEvent(_x) {
  return _searchEvent.apply(this, arguments);
}

function _searchEvent() {
  _searchEvent = _asyncToGenerator(function* (query) {
    var event = yield _event.EventModel.find();
    return event;
  });
  return _searchEvent.apply(this, arguments);
}

function getEventById(_x2) {
  return _getEventById.apply(this, arguments);
}

function _getEventById() {
  _getEventById = _asyncToGenerator(function* (eventId) {
    var event = yield _event.EventModel.findById(eventId);
    return event;
  });
  return _getEventById.apply(this, arguments);
}

function createEvent(_x3) {
  return _createEvent.apply(this, arguments);
}

function _createEvent() {
  _createEvent = _asyncToGenerator(function* (event) {
    var newEventModel = new _event.EventModel(event);
    var newEvent = yield newEventModel.save();
    return newEvent;
  });
  return _createEvent.apply(this, arguments);
}

function updateEvent(_x4, _x5) {
  return _updateEvent.apply(this, arguments);
}

function _updateEvent() {
  _updateEvent = _asyncToGenerator(function* (id, event) {
    var eventModel = yield _event.EventModel.findById(id);
    var updatedEventModel = Object.assign(eventModel, event);
    var updatedEvent = yield updatedEventModel.save();
    return updatedEvent;
  });
  return _updateEvent.apply(this, arguments);
}

function deleteEvent(_x6) {
  return _deleteEvent.apply(this, arguments);
}

function _deleteEvent() {
  _deleteEvent = _asyncToGenerator(function* (id) {
    var eventToDelete = yield _event.EventModel.findById(id); // Validate genre delete

    yield EventValidation.onDeleteValidations(eventToDelete);
    var deletedEvent = yield eventToDelete.deleteOne();
    return deletedEvent;
  });
  return _deleteEvent.apply(this, arguments);
}