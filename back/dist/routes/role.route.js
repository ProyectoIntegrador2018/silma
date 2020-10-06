"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRoleRoutes = void 0;

var _role = require("../controllers/role.controller");

var _jwt = require("../utils/jwt");

var _role2 = require("../validations/role.validation");

var addRoleRoutes = router => {
  router.get("/role/:id", (0, _jwt.verifyToken)(["admin"], "roleRead"), _role.getById);
  router.get("/role", (0, _jwt.verifyToken)(["admin"], "roleRead"), _role.list);
  router.post("/role", (0, _jwt.verifyToken)(["admin"], "roleCreate"), _role2.onSaveMiddleware, _role.create);
  router.patch("/role/:id", (0, _jwt.verifyToken)(["admin"], "roleEdit"), _role2.onSaveMiddleware, _role.update);
  router.delete("/role/:id", (0, _jwt.verifyToken)(["admin", "roleDelete"]), _role.deleteRole);
};

exports.addRoleRoutes = addRoleRoutes;