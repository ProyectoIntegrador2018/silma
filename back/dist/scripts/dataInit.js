"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEverything = createEverything;

var _user = require("../models/user.model");

var _admin = require("../models/admin.model");

var _text = require("../models/text.model");

var _writer = require("../models/writer.model");

var _reader = require("../models/reader.model");

var _suggestion = require("../models/suggestion.model");

var _genre = require("../models/genre.model");

var GenreLogic = _interopRequireWildcard(require("../logics/genre.logic"));

var _role = _interopRequireDefault(require("../models/role.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createUser(_x, _x2) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(function* (user, role) {
    var userFound = yield _user.UserModel.findOne({
      email: user.email
    }).select(["+password"]);

    if (!userFound) {
      if (user.password.length < 8) {
        return {
          status: "Password needs to be at least 8 characters long"
        };
      } // Assigns a role to the user.


      user.roles = [role];
      user.password = _bcrypt.default.hashSync(user.password, 10);
      var userModel = yield _user.UserModel.create(user);
      return userModel;
    }

    throw new Error("Error creating user");
  });
  return _createUser.apply(this, arguments);
}

function fillGenres() {
  return _fillGenres.apply(this, arguments);
}

function _fillGenres() {
  _fillGenres = _asyncToGenerator(function* () {
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
    return yield _genre.GenreModel.aggregate([{
      $lookup: {
        from: "subgenres",
        localField: "_id",
        foreignField: "genre",
        as: 'subgenres'
      }
    }]);
  });
  return _fillGenres.apply(this, arguments);
}

function createRole(_x3) {
  return _createRole.apply(this, arguments);
}

function _createRole() {
  _createRole = _asyncToGenerator(function* (role) {
    var roleModel = yield _role.default.create(role);
    return roleModel;
  });
  return _createRole.apply(this, arguments);
}

function createAdmin(_x4, _x5) {
  return _createAdmin.apply(this, arguments);
}

function _createAdmin() {
  _createAdmin = _asyncToGenerator(function* (user, roleId) {
    var userModel = yield createUser(user, "admin");
    var adminModel = yield _admin.AdminModel.create({
      user: userModel._id,
      role: roleId
    });
    return adminModel;
  });
  return _createAdmin.apply(this, arguments);
}

function createReader(_x6) {
  return _createReader.apply(this, arguments);
}

function _createReader() {
  _createReader = _asyncToGenerator(function* (reader) {
    var userModel = yield createUser(reader, "reader");
    var readerModel = yield _reader.ReaderModel.create(_objectSpread({
      user: userModel._id
    }, reader));
    return readerModel;
  });
  return _createReader.apply(this, arguments);
}

function createWriter(_x7) {
  return _createWriter.apply(this, arguments);
}

function _createWriter() {
  _createWriter = _asyncToGenerator(function* (writer) {
    var userModel = yield createUser(writer, "writer");
    var writerModel = yield _writer.WriterModel.create(_objectSpread({
      user: userModel._id
    }, writer));
    return writerModel;
  });
  return _createWriter.apply(this, arguments);
}

function createText(_x8) {
  return _createText.apply(this, arguments);
}

function _createText() {
  _createText = _asyncToGenerator(function* (text) {
    var textModel = yield _text.TextModel.create(text);
    return textModel;
  });
  return _createText.apply(this, arguments);
}

function deleteEverything() {
  return _deleteEverything.apply(this, arguments);
}

function _deleteEverything() {
  _deleteEverything = _asyncToGenerator(function* () {
    var promiseOne = _user.UserModel.deleteMany({});

    var promiseTwo = _admin.AdminModel.deleteMany({});

    var promiseThree = _writer.WriterModel.deleteMany({});

    var promiseFour = _reader.ReaderModel.deleteMany({});

    var promiseFive = _text.TextModel.deleteMany({});

    var promiseSix = _suggestion.SuggestionModel.deleteMany({});

    var promiseSeven = _genre.GenreModel.deleteMany({});

    var promiseEight = _role.default.deleteMany({});

    yield Promise.all([promiseOne, promiseTwo, promiseThree, promiseFour, promiseFive, promiseSix, promiseSeven, promiseEight]);
  });
  return _deleteEverything.apply(this, arguments);
}

function createSuggestion(_x9, _x10) {
  return _createSuggestion.apply(this, arguments);
}

function _createSuggestion() {
  _createSuggestion = _asyncToGenerator(function* (reader, text) {
    var suggestion = {
      reader,
      text,
      sentDate: new Date(),
      suggestionStatus: "Pending",
      score: 10,
      readingChapters: 5
    };
    return yield _suggestion.SuggestionModel.create(suggestion);
  });
  return _createSuggestion.apply(this, arguments);
}

function createEverything() {
  return _createEverything.apply(this, arguments);
}

function _createEverything() {
  _createEverything = _asyncToGenerator(function* () {
    var rolesExists = yield _role.default.find();
    if (rolesExists.length > 0) return;
    yield deleteEverything();
    var superAdminRole = yield createRole({
      code: "superAdmin",
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
      pointOfSaleDelete: true,
      pointOfSaleEdit: true,
      advancePhase: true,
      eventRead: true,
      eventCreate: true,
      eventDelete: true,
      eventEdit: true
    });
    console.log("Role 1 created successfully");
    var admin1 = yield createAdmin({
      name: "Admin 1",
      password: "prueba12345",
      email: "admin1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "Mexico"
    }, superAdminRole._id);
    console.log("Admin 1 created successfully");
    var admin2 = yield createAdmin({
      name: "Admin 2",
      password: "prueba12345",
      email: "admin2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690318",
      nationality: "Mexico"
    }, superAdminRole._id);
    console.log("Admin 2 created successfully");
    var genres = yield fillGenres();
    var subgenres = genres.map(genre => genre.subgenres[0]._id);
    console.log("Genres created successfully");
    var genreIds = subgenres.splice(0, 3).map(x => x._id);
    var reader1 = yield createReader({
      name: "Reader 1",
      password: "prueba12345",
      email: "reader1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "Mexico",
      readingProficiency: "4 to 6",
      facebookLink: "https://www.facebook.com/reader1",
      readFrom: "12-01-2019",
      readTill: "12-01-2020",
      preferences: genreIds
    });
    console.log("Reader 1 created successfully");
    var reader2 = yield createReader({
      name: "Reader 2",
      password: "prueba12345",
      email: "reader2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690319",
      nationality: "Mexico",
      readingProficiency: "4 to 6",
      facebookLink: "https://www.facebook.com/reader2",
      readFrom: "12-01-2019",
      readTill: "12-01-2020",
      preferences: genreIds
    });
    console.log("Reader 2 created successfully");
    var writer1 = yield createWriter({
      name: "Writer 1",
      password: "prueba12345",
      email: "writer1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "Mexico",
      pseudonym: "writer1"
    });
    console.log("Writer 1 created successfully");
    var writer2 = yield createWriter({
      name: "Writer 2",
      password: "prueba12345",
      email: "writer2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690319",
      nationality: "Mexico",
      pseudonym: "writer2"
    });
    console.log("Writer 2 created successfully");
    var text1 = yield createText({
      writer: writer1._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text A",
      registerNumber: "123asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 120,
      numberOfChapters: 50
    });
    console.log("Text 1 created successfully");
    var text2 = yield createText({
      writer: writer1._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text B",
      registerNumber: "123asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 120,
      numberOfChapters: 30
    });
    console.log("Text 2 created successfully");
    yield Promise.all([createSuggestion(reader1._id, text1._id), createSuggestion(reader1._id, text2._id)]);
    console.log("Suggestions created successfully");
  });
  return _createEverything.apply(this, arguments);
}