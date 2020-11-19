"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runProdDataInit = runProdDataInit;

var _genre = require("../models/genre.model");

var _role = _interopRequireDefault(require("../models/role.model"));

var GenreLogic = _interopRequireWildcard(require("../logics/genre.logic"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createRole(_x) {
  return _createRole.apply(this, arguments);
}

function _createRole() {
  _createRole = _asyncToGenerator(function* (role) {
    var newRole = yield _role.default.create(role);
    return newRole;
  });
  return _createRole.apply(this, arguments);
}

function createAllRoles() {
  return _createAllRoles.apply(this, arguments);
}

function _createAllRoles() {
  _createAllRoles = _asyncToGenerator(function* () {
    var roles = [{
      code: "super_admin",
      name: "Super Administrador",
      isBaseRole: true,
      readingRead: true,
      readingCreate: true,
      readingEdit: true,
      readingDelete: true,
      bookRead: true,
      bookCreate: true,
      bookEdit: true,
      bookDelete: true,
      phaseRead: true,
      phaseCreate: true,
      phaseEdit: true,
      phaseDelete: true,
      userRead: true,
      userCreate: true,
      userEdit: true,
      userDelete: true,
      eventRead: true,
      eventCreate: true,
      eventEdit: true,
      eventDelete: true,
      reportRead: true,
      reportCreate: true,
      reportEdit: true,
      reportDelete: true,
      roleRead: true,
      roleCreate: true,
      roleEdit: true,
      roleDelete: true,
      genreRead: true,
      genreCreate: true,
      genreEdit: true,
      genreDelete: true,
      advancePhase: true,
      pointOfSaleRead: true,
      pointOfSaleCreate: true,
      pointOfSaleEdit: true,
      pointOfSaleDelete: true,
      advancePhase: true
    }];
    var promises = roles.map(role => createRole(role));
    yield Promise.all(promises);
    console.log("All roles created");
  });
  return _createAllRoles.apply(this, arguments);
}

function createAllGenres() {
  return _createAllGenres.apply(this, arguments);
}

function _createAllGenres() {
  _createAllGenres = _asyncToGenerator(function* () {
    var genres = [{
      name: "Sobrenatural (paranormal)",
      description: "",
      subgenres: [{
        name: "Sobrenatural 1",
        description: "Descripcion"
      }]
    }, {
      name: "Romance",
      description: "",
      subgenres: [{
        name: "Romance 1",
        description: "Descripcion"
      }]
    }, {
      name: "Aventura",
      description: "",
      subgenres: [{
        name: "Aventura 1",
        description: "Descripcion"
      }]
    }, {
      name: "Fantasía épica (de héroes)",
      description: "",
      subgenres: [{
        name: "Fantasía épica (de héroes) 1",
        description: "Descripcion"
      }]
    }, {
      name: "Fantasía histórica",
      description: "",
      subgenres: [{
        name: "Fantasía histórica 1",
        description: "Descripcion"
      }]
    }, {
      name: "Realismo mágico",
      description: "",
      subgenres: [{
        name: "Realismo mágico 1",
        description: "Descripcion"
      }]
    }, {
      name: "Chicas mágicas",
      description: "",
      subgenres: [{
        name: "Chicas mágicas 1",
        description: "Descripcion"
      }]
    }, {
      name: "Fantasía tecnológica (ciencia ficción)",
      description: "",
      subgenres: [{
        name: "Fantasía tecnológica (ciencia ficción) 1",
        description: "Descripcion"
      }]
    }, {
      name: "Fantasía oscura",
      description: "",
      subgenres: [{
        name: "Fantasía oscura 1",
        description: "Descripcion"
      }]
    }, {
      name: "Steampunk",
      description: "",
      subgenres: [{
        name: "Steampunk 1",
        description: "Descripcion"
      }]
    }, {
      name: "Terror",
      description: "",
      subgenres: [{
        name: "Terror 1",
        description: "Descripcion"
      }]
    }, {
      name: "Fantasía infantil",
      description: "",
      subgenres: [{
        name: "Fantasía infantil 1",
        description: "Descripcion"
      }]
    }];
    var promises = genres.map(genre => GenreLogic.createGenre(genre));
    yield Promise.all(promises);
    console.log("All genres created");
    return yield _genre.GenreModel.find({});
  });
  return _createAllGenres.apply(this, arguments);
}

function runProdDataInit() {
  return _runProdDataInit.apply(this, arguments);
}

function _runProdDataInit() {
  _runProdDataInit = _asyncToGenerator(function* () {
    try {
      var countPromises = [_role.default.countDocuments(), _genre.GenreModel.countDocuments()];
      var [rolesCount, genresCount] = yield Promise.all(countPromises);
      if (rolesCount === 0) yield createAllRoles();
      if (genresCount === 0) yield createAllGenres();
    } catch (error) {
      console.error(error);
    }
  });
  return _runProdDataInit.apply(this, arguments);
}