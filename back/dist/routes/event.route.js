"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventRoutes = addEventRoutes;

var _event = require("../controllers/event.controller");

var _jwt = require("../utils/jwt");

var _event2 = require("../validations/event.validation");

function addEventRoutes(router) {
  var moduleName = "event";
  router.get("/".concat(moduleName, "/search"), (0, _jwt.verifyToken)(["admin"], "eventRead"), _event.searchEvent);
  router.get("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "eventRead"), _event.getEventById);
  router.post("/".concat(moduleName), (0, _jwt.verifyToken)(["admin"], "eventCreate"), _event2.onSaveMiddleware, _event.createEvent);
  router.patch("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "eventEdit"), _event2.onSaveMiddleware, _event.updateEvent);
  router.delete("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "eventDelete"), _event.deleteEvent);
}