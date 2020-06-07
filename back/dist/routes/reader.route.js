"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReaderRoutes = void 0;

var _reader = require("../controllers/reader.controller");

var _jwt = require("../utils/jwt");

var addReaderRoutes = router => {
  router.get("/readers", (0, _jwt.verifyToken)(["admin"]), _reader.getReaders);
  router.get("/readers/:id", (0, _jwt.verifyToken)(["reader", "admin"]), _reader.getReader);
  router.post("/register/readers", _reader.createReader);
  router.post("/register/feedback", (0, _jwt.verifyToken)(["reader"]), _reader.createFeedback);
  router.post("/register/addReader", (0, _jwt.verifyToken)(["writer", "admin"]), _reader.addReaderRegister);
};

exports.addReaderRoutes = addReaderRoutes;