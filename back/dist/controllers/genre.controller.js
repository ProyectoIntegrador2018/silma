"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteGenre = exports.updateGenre = exports.createGenre = exports.getGenreById = exports.searchGenres = void 0;

var GenreLogic = _interopRequireWildcard(require("../logics/genre.logic"));

var _errors = require("../utils/errors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var searchGenres = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var query = request.query;
    return yield GenreLogic.searchGenres(query);
  }));
};

exports.searchGenres = searchGenres;

var getGenreById = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var id = request.params.id;
    return yield GenreLogic.getGenreById(id);
  }));
};

exports.getGenreById = getGenreById;

var createGenre = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var genre = request.body;
    return yield GenreLogic.createGenre(genre);
  }));
};

exports.createGenre = createGenre;

var updateGenre = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var genre = request.body;
    var id = request.params.id;
    return yield GenreLogic.updateGenre(id, genre);
  }));
};

exports.updateGenre = updateGenre;

var deleteGenre = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var id = request.params.id;
    return yield GenreLogic.deleteGenre(id);
  }));
};

exports.deleteGenre = deleteGenre;