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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteEverything = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    yield _user.UserModel.deleteMany({});
    yield _admin.AdminModel.deleteMany({});
    yield _writer.WriterModel.deleteMany({});
    yield _reader.ReaderModel.deleteMany({});
    yield _text.TextModel.deleteMany({});
    yield _suggestion.SuggestionModel.deleteMany({});
    yield _genre.GenreModel.deleteMany({});
  });

  return function deleteEverything() {
    return _ref.apply(this, arguments);
  };
}();

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
          nationality: "Mexico",
          isSuperAdmin: true
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

var runAll = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    yield deleteEverything();
    var genres = yield _axios.default.post("http://localhost:3000/api/admins/fillGenres");
    var genreIds = genres.data.splice(0, 3).map(x => x._id);
    var admin1 = yield createFirstAdmin();
    console.log('Admin 1: ', admin1._id);
    var authAdmin = yield _axios.default.post("http://localhost:3000/api/user/authentication", {
      email: "admin1@gmail.com",
      password: "prueba12345"
    });
    var tokenAdmin = authAdmin.data.token;
    var admin2 = yield _axios.default.post("http://localhost:3000/api/admins/register", {
      name: "Admin 2",
      password: "prueba12345",
      email: "admin2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690318",
      nationality: "Mexico"
    }, {
      headers: {
        "Authorization": 'Bearer ' + tokenAdmin
      }
    });
    console.log('Admin 2: ', admin2.data._id);
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
    console.log('Reader 1: ', reader1.data._id);
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
    console.log('Reader 2: ', reader2.data._id);
    var writer1 = yield _axios.default.post("http://localhost:3000/api/register/writers", {
      name: "Writer 1",
      password: "prueba12345",
      email: "writer1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "Mexico",
      pseudonym: "writer1"
    });
    console.log('Writer 1: ', writer1.data._id);
    var writer2 = yield _axios.default.post("http://localhost:3000/api/register/writers", {
      name: "Writer 2",
      password: "prueba12345",
      email: "writer2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690319",
      nationality: "Mexico",
      pseudonym: "writer2"
    });
    console.log('Writer 2: ', writer2.data._id);
    var auth = yield _axios.default.post("http://localhost:3000/api/user/authentication", {
      email: "writer1@gmail.com",
      password: "prueba12345"
    });
    var {
      token
    } = auth.data;
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
        "Authorization": 'Bearer ' + token
      }
    });
    console.log('Text 1: ', text1.data._id);
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
        "Authorization": 'Bearer ' + token
      }
    });
    console.log('Text 2: ', text2.data._id);
  });

  return function runAll() {
    return _ref3.apply(this, arguments);
  };
}();

try {
  runAll();
} catch (error) {
  console.error(error);
}