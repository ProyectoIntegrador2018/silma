"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoutes = void 0;

var _express = require("express");

var _writer = require("./writer.route");

var _admin = require("./admin.route");

var _reader = require("./reader.route");

var _role = require("./role.route");

var _text = require("./text.route");

var _suggestion = require("./suggestion.route");

var _user = require("../controllers/user.controller");

var _jwt = require("../utils/jwt");

var createRoutes = () => {
  var router = (0, _express.Router)();
  router.post("/user/authentication", _user.authUser);
  router.get("/users/:id", (0, _jwt.verifyToken)(), _user.getUser);
  router.get("/user/genres", _user.getAllGenres);
  (0, _writer.addWriterRoutes)(router);
  (0, _admin.addAdminRoutes)(router);
  (0, _reader.addReaderRoutes)(router);
  (0, _role.addRoleRoutes)(router);
  (0, _text.addTextRoutes)(router);
  (0, _suggestion.addSuggestionRoutes)(router);
  return router;
};

exports.createRoutes = createRoutes;