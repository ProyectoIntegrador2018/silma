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

var _subgenre = require("../models/subgenre.model");

var GenreLogic = _interopRequireWildcard(require("../logics/genre.logic"));

var _role = _interopRequireDefault(require("../models/role.model"));

var _product = require("../models/product.model");

var _inventory = require("../models/inventory.model");

var _sale = require("../models/sale.model");

var _event = require("../models/event.model");

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

function createProduct(_x9) {
  return _createProduct.apply(this, arguments);
}

function _createProduct() {
  _createProduct = _asyncToGenerator(function* (product) {
    var productModel = yield _product.ProductModel.create(product);
    return productModel;
  });
  return _createProduct.apply(this, arguments);
}

function createInventory(_x10) {
  return _createInventory.apply(this, arguments);
}

function _createInventory() {
  _createInventory = _asyncToGenerator(function* (inventory) {
    var inventoryModel = yield _inventory.InventoryModel.create(inventory);
    return inventoryModel;
  });
  return _createInventory.apply(this, arguments);
}

function createEvent(_x11) {
  return _createEvent.apply(this, arguments);
}

function _createEvent() {
  _createEvent = _asyncToGenerator(function* (event) {
    var eventModel = yield _event.EventModel.create(event);
    return eventModel;
  });
  return _createEvent.apply(this, arguments);
}

function createSale(_x12) {
  return _createSale.apply(this, arguments);
}

function _createSale() {
  _createSale = _asyncToGenerator(function* (sale) {
    var saleModel = yield _sale.SaleModel.create(sale);
    return saleModel;
  });
  return _createSale.apply(this, arguments);
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

    var promiseNine = _subgenre.SubgenreModel.deleteMany({});

    var promiseTen = _product.ProductModel.deleteMany({});

    var promiseEleven = _inventory.InventoryModel.deleteMany({});

    var promiseTwelve = _sale.SaleModel.deleteMany({});

    var promiseThirteen = _event.EventModel.deleteMany({});

    yield Promise.all([promiseOne, promiseTwo, promiseThree, promiseFour, promiseFive, promiseSix, promiseSeven, promiseEight, promiseNine, promiseTen, promiseEleven, promiseTwelve, promiseThirteen]);
  });
  return _deleteEverything.apply(this, arguments);
}

function createSuggestion(_x13, _x14) {
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

function createSuggestionCompleted(_x15, _x16) {
  return _createSuggestionCompleted.apply(this, arguments);
}

function _createSuggestionCompleted() {
  _createSuggestionCompleted = _asyncToGenerator(function* (reader, text) {
    var suggestion = {
      reader,
      text,
      sentDate: new Date(),
      suggestionStatus: "Completed",
      score: 10,
      readingChapters: 5
    };
    return yield _suggestion.SuggestionModel.create(suggestion);
  });
  return _createSuggestionCompleted.apply(this, arguments);
}

function createEverything() {
  return _createEverything.apply(this, arguments);
}

function _createEverything() {
  _createEverything = _asyncToGenerator(function* () {
    var rolesExists = yield _role.default.find(); ///if (rolesExists.length > 0) return;
    // await deleteEverythiconst superAdminRole = await createRole({
    //   code: "superAdmin",
    //   name: "Super Administrador",
    //   isBaseRole: true,
    //   readingRead: true,
    //   readingCreate: true,
    //   readingEdit: true,
    //   readingDelete: true,
    //   bookRead: true,
    //   bookCreate: true,
    //   bookEdit: true,
    //   bookDelete: true,
    //   phaseRead: true,
    //   phaseCreate: true,
    //   phaseEdit: true,
    //   phaseDelete: true,
    //   userRead: true,
    //   userCreate: true,
    //   userEdit: true,
    //   userDelete: true,
    //   eventRead: true,
    //   eventCreate: true,
    //   eventEdit: true,
    //   eventDelete: true,
    //   reportsRead: true,
    //   reportsCreate: true,
    //   reportsEdit: true,
    //   reportsDelete: true,
    //   roleRead: true,
    //   roleCreate: true,
    //   roleEdit: true,
    //   roleDelete: true,
    //   genreRead: true,
    //   genreCreate: true,
    //   genreEdit: true,
    //   genreDelete: true,
    //   advancePhase: true,
    //   pointOfSaleRead: true,
    //   pointOfSaleCreate: true,
    //   pointOfSaleDelete: true,
    //   pointOfSaleEdit: true,
    //   advancePhase: true,
    //   eventRead: true,
    //   eventCreate: true,
    //   eventDelete: true,
    //   eventEdit: true,
    //   saleRead: true,
    //   saleCreate: true,
    //   saleEdit: true,
    //   saleDelete: true
    // });ng();
    // 

    console.log("Role 1 created successfully");
    var admin1 = yield createAdmin({
      name: "Admin 1",
      password: "prueba12345",
      email: "admin1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "México"
    }, rolesExists[0]._id);
    console.log("Admin 1 created successfully");
    var admin2 = yield createAdmin({
      name: "Admin 2",
      password: "prueba12345",
      email: "admin2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690318",
      nationality: "México"
    }, rolesExists[0]._id);
    console.log("Admin 2 created successfully");
    var genres = yield _genre.GenreModel.aggregate([{
      $lookup: {
        from: "subgenres",
        localField: "_id",
        foreignField: "genre",
        as: 'subgenres'
      }
    }]);
    var subgenres = genres.map(genre => genre.subgenres[0]._id);
    console.log("Genres created successfully");
    var genreIds = subgenres.splice(0, 3).map(x => x._id);
    var reader1 = yield createReader({
      name: "Reader 1",
      password: "prueba12345",
      email: "reader1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "México",
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
      nationality: "México",
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
      nationality: "México",
      pseudonym: "writer1"
    });
    console.log("Writer 1 created successfully");
    var writer2 = yield createWriter({
      name: "Writer 2",
      password: "prueba12345",
      email: "writer2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690319",
      nationality: "México",
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
      numberOfChapters: 50,
      datesPerPhase: {
        2: new Date("2021-05-29T16:00:00Z"),
        3: new Date("2021-05-30T20:00:00Z"),
        4: new Date("2021-05-31T12:00:00Z"),
        5: new Date("2021-06-02T15:00:00Z"),
        6: new Date("2021-06-04T10:00:00Z"),
        7: new Date("2021-06-05T07:00:00Z"),
        8: new Date("2021-06-06T09:00:00Z"),
        9: new Date("2021-06-07T14:00:00Z")
      }
    });
    console.log("Text 1 created successfully");
    var text2 = yield createText({
      writer: writer1._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text B",
      registerNumber: "12345asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 120,
      numberOfChapters: 30,
      datesPerPhase: {
        2: new Date("2021-05-29T16:00:00Z"),
        3: new Date("2021-05-29T23:00:00Z"),
        4: new Date("2021-05-30T12:00:00Z"),
        5: new Date("2021-06-02T11:00:00Z"),
        6: new Date("2021-06-07T07:00:00Z"),
        7: new Date("2021-06-07T20:00:00Z"),
        8: new Date("2021-06-08T11:00:00Z"),
        9: new Date("2021-06-09T13:00:00Z")
      }
    });
    console.log("Text 2 created successfully");
    var text3 = yield createText({
      writer: writer1._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text C",
      registerNumber: "1234asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 120,
      numberOfChapters: 30,
      isRejected: true
    });
    console.log("Text 3 created successfully");
    var text4 = yield createText({
      writer: writer2._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text D",
      registerNumber: "1234asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 120,
      numberOfChapters: 30,
      datesPerPhase: {
        2: new Date("2021-05-29T12:00:00Z"),
        3: new Date("2021-05-29T18:00:00Z"),
        4: new Date("2021-05-31T18:00:00Z"),
        5: new Date("2021-06-04T23:00:00Z"),
        6: new Date("2021-06-05T10:00:00Z"),
        7: new Date("2021-06-06T01:00:00Z"),
        8: new Date("2021-06-06T12:00:00Z"),
        9: new Date("2021-06-07T11:00:00Z")
      }
    });
    console.log("Text 4 created successfully");
    var text5 = yield createText({
      writer: writer2._id,
      genres: genreIds,
      ageRange: "10-12",
      title: "Text E",
      registerNumber: "1234asd",
      description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
      numberOfPages: 160,
      numberOfChapters: 40,
      isRejected: true
    });
    console.log("Text 5 created successfully");
    var inventory1 = yield createInventory({
      writer: writer1._id,
      items: []
    });
    console.log("Inventory 1 created successfully");
    var product1 = yield createProduct({
      name: "Sticker 1",
      description: "Sticker 1 for Book",
      price: 123,
      stock: 10,
      link: "https://semantic-ui.com/images/wireframe/image.png",
      category: "Merchandise",
      inventory: inventory1._id
    });
    console.log("Product 1 created successfully");
    var product2 = yield createProduct({
      name: "Book 1",
      description: "Book 1",
      price: 123,
      stock: 10,
      link: "https://semantic-ui.com/images/wireframe/image.png",
      category: "Book",
      inventory: inventory1._id
    });
    console.log("Product 2 created successfully");
    inventory1.items.push(product1);
    inventory1.items.push(product2);
    inventory1.save();
    console.log("Inventory 1 updated successfully");
    var inventory2 = yield createInventory({
      writer: writer2._id,
      items: []
    });
    console.log("Inventory 2 created successfully");
    var product3 = yield createProduct({
      name: "Sticker 2",
      description: "Sticker 2 for Book",
      price: 123,
      stock: 10,
      link: "https://semantic-ui.com/images/wireframe/image.png",
      category: "Merchandise",
      inventory: inventory2._id
    });
    console.log("Product 3 created successfully");
    var product4 = yield createProduct({
      name: "Book 2",
      description: "Book 2",
      price: 123,
      stock: 10,
      link: "https://semantic-ui.com/images/wireframe/image.png",
      category: "Book",
      inventory: inventory2._id
    });
    console.log("Product 4 created successfully");
    inventory2.items.push(product3);
    inventory2.items.push(product4);
    inventory2.save();
    console.log("Inventory 2 updated successfully");
    var event1 = yield createEvent({
      name: "asd",
      description: "asd",
      place: "asd",
      date: "2021-04-28",
      time: "15:00"
    });
    console.log("Event 1 created successfully");
    var sale1 = yield createSale({
      createdBy: admin1._id,
      event: event1,
      items: [{
        productId: product1,
        name: "Sticker 1",
        price: 123,
        numberOfItems: 1,
        subtotal: 123
      }, {
        productId: product2,
        name: "Book 1",
        price: 123,
        numberOfItems: 1,
        subtotal: 123
      }, {
        productId: product3,
        name: "Sticker 2",
        price: 123,
        numberOfItems: 1,
        subtotal: 123
      }],
      total: 369
    });
    console.log("Sale 1 created successfully");
    var sale2 = yield createSale({
      createdBy: admin1._id,
      event: event1,
      items: [{
        productId: product2,
        name: "Book 1",
        price: 123,
        numberOfItems: 3,
        subtotal: 123
      }, {
        productId: product3,
        name: "Sticker 2",
        price: 123,
        numberOfItems: 5,
        subtotal: 123
      }],
      total: 984
    });
    console.log("Sale 2 created successfully");
    yield Promise.all([createSuggestion(reader1._id, text1._id), createSuggestion(reader1._id, text2._id), createSuggestion(reader1._id, text3._id), createSuggestion(reader1._id, text4._id), createSuggestionCompleted(reader1._id, text5._id)]);
    console.log("Suggestions created successfully");
  });
  return _createEverything.apply(this, arguments);
}