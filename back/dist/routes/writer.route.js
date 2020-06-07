"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addWriterRoutes = void 0;

var _writer = require("../controllers/writer.controller");

var _jwt = require("../utils/jwt");

var addWriterRoutes = router => {
  router.get("/writers", (0, _jwt.verifyToken)(["admin"]), _writer.getWriters);
  router.get("/writers/:id", (0, _jwt.verifyToken)(), _writer.getWriter);
  router.post("/register/writers", _writer.createWriter);
  router.post("/register/addWriter", (0, _jwt.verifyToken)(["reader", "admin"]), _writer.addWriterRegister);
};

exports.addWriterRoutes = addWriterRoutes;