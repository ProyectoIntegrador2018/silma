"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdminRoutes = void 0;

var _admin = require("../controllers/admin.controller");

var _suggestion = require("../controllers/suggestion.controller");

var addAdminRoutes = router => {
  router.get("/admins", _admin.getAdmins);
  router.get("/admins/:id", _admin.getAdmin);
  router.post("/admins/register", _admin.createAdmin);
  router.post("/admins/register/genres", _admin.createGenre);
  router.post("/admins/fillGenres", _admin.fillGenres);
  router.get("/admins/feedback/:id", _admin.getFeedback);
  router.post("/admins/texts/movePhase/:id", _admin.movePhase);
  router.get("/admins/suggestions/getTextSuggestions/:id", _suggestion.getTextSuggestions);
  router.post("/admins/suggestions/createSuggestions/", _suggestion.createSuggestionAdmin);
  router.delete("/admins/suggestions/deleteSuggestion/:id", _suggestion.deleteSuggestionAdmin);
};

exports.addAdminRoutes = addAdminRoutes;