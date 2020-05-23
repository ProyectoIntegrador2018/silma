"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addWriterRoutes = void 0;

var _writer = require("../controllers/writer.controller");

var addWriterRoutes = function addWriterRoutes(router) {
  router.get("/writers", _writer.getWriters);
  router.get("/writers/:id", _writer.getWriter);
  router.post("/register/writers", _writer.createWriter);
};

exports.addWriterRoutes = addWriterRoutes;