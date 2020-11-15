"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runProdDataInit = runProdDataInit;

var _genre = require("../models/genre.model");

var _role = _interopRequireDefault(require("../models/role.model"));

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

function createGenre(_x2) {
  return _createGenre.apply(this, arguments);
}

function _createGenre() {
  _createGenre = _asyncToGenerator(function* (genre) {
    var newGenre = yield _genre.GenreModel.create(genre);
    return newGenre;
  });
  return _createGenre.apply(this, arguments);
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
      subgenres: []
    }, {
      name: "Romance",
      description: "",
      subgenres: []
    }, {
      name: "Aventura",
      description: "",
      subgenres: []
    }, {
      name: "Fantasía épica (de héroes)",
      description: "",
      subgenres: []
    }, {
      name: "Fantasía histórica",
      description: "",
      subgenres: []
    }, {
      name: "Realismo mágico",
      description: "",
      subgenres: []
    }, {
      name: "Chicas mágicas",
      description: "",
      subgenres: []
    }, {
      name: "Fantasía tecnológica (ciencia ficción)",
      description: "",
      subgenres: []
    }, {
      name: "Fantasía oscura",
      description: "",
      subgenres: []
    }, {
      name: "Steampunk",
      description: "",
      subgenres: []
    }, {
      name: "Terror",
      description: "",
      subgenres: []
    }, {
      name: "Fantasía infantil",
      description: "",
      subgenres: []
    }, {
      name: "Otros",
      description: "",
      subgenres: []
    }];
    var promises = genres.map(genre => createGenre(genre));
    yield Promise.all(promises);
    console.log("All genres created");
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