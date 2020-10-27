"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchGenres = searchGenres;
exports.getGenreById = getGenreById;
exports.createGenre = createGenre;
exports.updateGenre = updateGenre;
exports.deleteGenre = deleteGenre;

var _genre = require("../models/genre.model");

var _subgenre = require("../models/subgenre.model");

var GenreValidation = _interopRequireWildcard(require("../validations/genre.validation"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function searchGenres(_x) {
  return _searchGenres.apply(this, arguments);
}

function _searchGenres() {
  _searchGenres = _asyncToGenerator(function* (query) {
    var genres = yield _genre.GenreModel.find();
    return genres;
  });
  return _searchGenres.apply(this, arguments);
}

function getGenreById(_x2) {
  return _getGenreById.apply(this, arguments);
}

function _getGenreById() {
  _getGenreById = _asyncToGenerator(function* (genreId) {
    var genrePromise = _genre.GenreModel.findById(genreId);

    var subgenresPromise = _subgenre.SubgenreModel.find({
      genre: genreId
    });

    var [genre, subgenres] = yield Promise.all([genrePromise, subgenresPromise]);
    return _objectSpread({}, genre.toJSON(), {
      subgenres: subgenres.map(x => x.toJSON())
    });
  });
  return _getGenreById.apply(this, arguments);
}

function createGenre(_x3) {
  return _createGenre.apply(this, arguments);
}

function _createGenre() {
  _createGenre = _asyncToGenerator(function* (genre) {
    var {
      subgenres
    } = genre;
    var newGenreModel = new _genre.GenreModel(genre);
    var newGenre = yield newGenreModel.save();
    var subgenresPromises = subgenres.map(subgenre => {
      var subgenreWithId = _objectSpread({}, subgenre, {
        genre: newGenre._id
      });

      var subgenreModel = new _subgenre.SubgenreModel(subgenreWithId);
      return subgenreModel.save();
    });
    var newSubgenres = yield Promise.all(subgenresPromises);
    return _objectSpread({}, newGenre.toJSON(), {
      subgenres: newSubgenres.map(x => x.toJSON())
    });
  });
  return _createGenre.apply(this, arguments);
}

function updateGenre(_x4, _x5) {
  return _updateGenre.apply(this, arguments);
}

function _updateGenre() {
  _updateGenre = _asyncToGenerator(function* (id, genre) {
    var {
      subgenres,
      subgenresToDelete
    } = genre;
    var genreModel = yield _genre.GenreModel.findById(id);
    var updatedGenreModel = Object.assign(genreModel, genre);
    var updatedGenre = yield updatedGenreModel.save();
    var subgenresPromises = subgenres.map( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (subgenre) {
        if (subgenre._id) {
          var subgenreModel = yield _subgenre.SubgenreModel.findById(subgenre._id);
          var updatedSubgenre = Object.assign(subgenreModel, subgenre);
          return updatedSubgenre.save();
        }

        var subgenreWithId = _objectSpread({}, subgenre, {
          genre: updatedGenre._id
        });

        var newSubgenre = new _subgenre.SubgenreModel(subgenreWithId);
        return newSubgenre.save();
      });

      return function (_x7) {
        return _ref.apply(this, arguments);
      };
    }());
    var subgenresToDeletePromises = subgenresToDelete.filter(x => !!x._id).map(subgenre => _subgenre.SubgenreModel.deleteOne({
      _id: subgenre._id
    }));
    var [updatedSubgenres, _] = yield Promise.all([Promise.all(subgenresPromises), Promise.all(subgenresToDeletePromises)]);
    return _objectSpread({}, updatedGenre.toJSON(), {
      subgenres: updatedSubgenres.map(x => x.toJSON())
    });
  });
  return _updateGenre.apply(this, arguments);
}

function deleteGenre(_x6) {
  return _deleteGenre.apply(this, arguments);
}

function _deleteGenre() {
  _deleteGenre = _asyncToGenerator(function* (genreId) {
    var subgenresToDeletePromise = _subgenre.SubgenreModel.find({
      genre: genreId
    });

    var genreToDeletePromise = _genre.GenreModel.findById(genreId);

    var [subgenresToDelete, genreToDelete] = yield Promise.all([subgenresToDeletePromise, genreToDeletePromise]); // TODO - Validate subgenres to delete
    // Validate genre delete

    yield GenreValidation.onDeleteValidations(genreToDelete);
    var deletedSubgenres = yield Promise.all(subgenresToDelete.map(subgenre => subgenre.deleteOne()));
    var deletedGenre = yield genreToDelete.deleteOne();
    return {
      deletedSubgenres,
      deletedGenre
    };
  });
  return _deleteGenre.apply(this, arguments);
}