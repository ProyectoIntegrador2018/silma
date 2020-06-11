"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdminRoutes = void 0;

var _admin = require("../controllers/admin.controller");

var _suggestion = require("../controllers/suggestion.controller");

var _jwt = require("../utils/jwt");

var addAdminRoutes = router => {
  router.get("/admins", (0, _jwt.verifyToken)(["admin"]), _admin.getAdmins);
  router.get("/admins/:id", (0, _jwt.verifyToken)(["admin"]), _admin.getAdmin);
  router.post("/admins/register", _admin.createAdmin);
  router.post("/admins/register/genres", (0, _jwt.verifyToken)(["admin"]), _admin.createGenre);
  router.post("/admins/fillGenres", _admin.fillGenres);
  router.get("/admins/feedback/:id", (0, _jwt.verifyToken)(["admin", "reader"]), _admin.getFeedback);
  router.post("/admins/texts/movePhase/:id", (0, _jwt.verifyToken)(["admin"]), _admin.movePhase);
  router.get("/admins/suggestions/getTextSuggestions/:id", (0, _jwt.verifyToken)(["admin", "reader"]), _suggestion.getTextSuggestions);
  router.post("/admins/suggestions/createSuggestions/", (0, _jwt.verifyToken)(["admin"]), _suggestion.createSuggestionAdmin);
  router.delete("/admins/suggestions/deleteSuggestion/:id", (0, _jwt.verifyToken)(["admin"]), _suggestion.deleteSuggestionAdmin);
  router.get("/admins/feedbacks/:id", (0, _jwt.verifyToken)(["admin"]), _admin.getFeedbackIdBySuggestion);
};

exports.addAdminRoutes = addAdminRoutes;