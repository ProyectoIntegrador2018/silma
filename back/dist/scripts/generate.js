"use strict";

var _server = _interopRequireDefault(require("../server"));

var _user = require("../models/user.model");

var _admin = require("../models/admin.model");

var _text = require("../models/text.model");

var _writer = require("../models/writer.model");

var _reader = require("../models/reader.model");

var _suggestion = require("../models/suggestion.model");

var _genre = require("../models/genre.model");

var _axios = _interopRequireDefault(require("axios"));

var _admin2 = require("../controllers/admin.controller");

var _role = _interopRequireDefault(require("../models/role.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Deletes all data from local.
var deleteEverything = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
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

  return function deleteEverything() {
    return _ref.apply(this, arguments);
  };
}(); // Creates the first admin from mongo, skiping security check.


var createFirstAdmin = () => {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (resolve, reject) {
      yield (0, _admin2.createAdmin)({
        body: {
          name: "Admin 1",
          password: "prueba12345",
          email: "admin1@gmail.com",
          birthdate: "12/12/2000",
          phone: "8116690319",
          nationality: "Mexico"
        }
      }, {
        send: data => resolve(data)
      });
    });

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

function createSuperAdminRole(_x3) {
  return _createSuperAdminRole.apply(this, arguments);
}

function _createSuperAdminRole() {
  _createSuperAdminRole = _asyncToGenerator(function* (token) {
    var form = {
      code: "superAdmin",
      name: "Super Administrador",
      isBaseRole: true,
      inventoriesRead: true,
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
      saleRead: true,
      saleCreate: true,
      saleEdit: true,
      saleDelete: true
    };
    yield _axios.default.post("http://localhost:3000/api/role", form, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
  });
  return _createSuperAdminRole.apply(this, arguments);
}

var runAll = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    yield deleteEverything(); // Fills out genres with a preset.

    var genres = yield _axios.default.post("http://localhost:3000/api/admins/fillGenres"); // Gets only the first 3 genres-

    var genreIds = genres.data.splice(0, 3).map(x => x._id);
    var admin1 = yield createFirstAdmin();
    console.log("Admin 1: ", admin1._id); // Authenticates the first admin
    // This is done so the admin can create new admin users.

    var authAdmin = yield _axios.default.post("http://localhost:3000/api/user/authentication", {
      email: "admin1@gmail.com",
      password: "prueba12345"
    });
    var tokenAdmin = authAdmin.data.token; // Creates second admin.

    var admin2 = yield _axios.default.post("http://localhost:3000/api/admins/register", {
      name: "Admin 2",
      password: "prueba12345",
      email: "admin2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690318",
      nationality: "Mexico"
    }, {
      headers: {
        Authorization: "Bearer " + tokenAdmin
      }
    });
    console.log("Admin 2: ", admin2.data._id); // Create Default Roles

    yield createSuperAdminRole(tokenAdmin);
    console.log("Rol Superadministrador creado"); // Creates first reader.

    var reader1 = yield _axios.default.post("http://localhost:3000/api/register/readers", {
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
    console.log("Reader 1: ", reader1.data._id); // Creates second reader.

    var reader2 = yield _axios.default.post("http://localhost:3000/api/register/readers", {
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
    console.log("Reader 2: ", reader2.data._id); // Creates first writer.

    var writer1 = yield _axios.default.post("http://localhost:3000/api/register/writers", {
      name: "Writer 1",
      password: "prueba12345",
      email: "writer1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "Mexico",
      pseudonym: "writer1"
    });
    console.log("Writer 1: ", writer1.data._id); // Creates second writer.

    var writer2 = yield _axios.default.post("http://localhost:3000/api/register/writers", {
      name: "Writer 2",
      password: "prueba12345",
      email: "writer2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690319",
      nationality: "Mexico",
      pseudonym: "writer2"
    });
    console.log("Writer 2: ", writer2.data._id); // Autheticates first writer to create texts.

    var auth = yield _axios.default.post("http://localhost:3000/api/user/authentication", {
      email: "writer1@gmail.com",
      password: "prueba12345"
    });
    console.log("Writer 1 authenticated succesfully");
    var {
      token
    } = auth.data; // Writer1 creates first text.

    var text1 = yield _axios.default.post("http://localhost:3000/api/texts", {
      writer: writer1.data._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text A",
      registerNumber: "123asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 120,
      numberOfChapters: 50
    }, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log("Text 1: ", text1.data._id); // Writer1 creates second text.

    var text2 = yield _axios.default.post("http://localhost:3000/api/texts", {
      writer: writer1.data._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text B",
      registerNumber: "123asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 120,
      numberOfChapters: 30
    }, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log("Text 2: ", text2.data._id);
  });

  return function runAll() {
    return _ref3.apply(this, arguments);
  };
}();

runAll().catch(err => console.error(err));