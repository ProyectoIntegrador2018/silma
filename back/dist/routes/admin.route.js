"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdminRoutes = void 0;

var _admin = require("../controllers/admin.controller");

var addAdminRoutes = function addAdminRoutes(router) {
  router.get("/admins", _admin.getAdmins);
  router.get("/admins/:id", _admin.getAdmin);
  router.post("/admins/register", _admin.createAdmin);
  router.post("/admins/register/genres", _admin.createGenre);
  router.post("/admins/fillGenres", _admin.fillGenres);
};

exports.addAdminRoutes = addAdminRoutes;