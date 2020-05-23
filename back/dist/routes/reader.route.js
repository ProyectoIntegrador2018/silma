"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReaderRoutes = void 0;

var _reader = require("../controllers/reader.controller");

var addReaderRoutes = function addReaderRoutes(router) {
  router.get("/readers", _reader.getReaders);
  router.get("/readers/:id", _reader.getReader);
  router.post("/register/readers", _reader.createReader);
};

exports.addReaderRoutes = addReaderRoutes;