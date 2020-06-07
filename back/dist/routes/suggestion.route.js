"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSuggestionRoutes = void 0;

var _suggestion = require("../controllers/suggestion.controller");

var _jwt = require("../utils/jwt");

var addSuggestionRoutes = router => {
  router.post("/suggestions/:id/reject", (0, _jwt.verifyToken)(["reader"]), _suggestion.rejectSuggestion);
  router.post("/suggestions/:id/accept", (0, _jwt.verifyToken)(["reader"]), _suggestion.acceptSuggestion);
  router.post("/suggestions/:id/complete", (0, _jwt.verifyToken)(["reader"]), _suggestion.completeSuggestion);
  router.get("/suggestions/getSuggestion/:id", (0, _jwt.verifyToken)(["admin"]), _suggestion.getSuggestionFromReader);
  router.get("/suggestions/getReadersWithoutSuggestion/:id", (0, _jwt.verifyToken)(["admin"]), _suggestion.getReadersWithoutSuggestion);
  router.get("/suggestions/getAllSuggestions/:id", (0, _jwt.verifyToken)(["admin", "reader"]), _suggestion.getAllSuggestionsFromReader);
  router.get("/suggestions/getSuggestionDashboard/:id", (0, _jwt.verifyToken)(["reader"]), _suggestion.getSuggestionFromReaderDashboard);
  router.get("/suggestions/getAllSuggestionsDashboard/:id", (0, _jwt.verifyToken)(["reader"]), _suggestion.getAllSuggestionsFromReaderDashboard);
  router.get("/suggestions/getTextSuggestions/:id", (0, _jwt.verifyToken)(["admin"]), _suggestion.getTextSuggestions);
  router.get("/suggestions/:id", (0, _jwt.verifyToken)(["admin", "reader"]), _suggestion.getSuggestion);
  router.get("/suggestions/feedback/:id", (0, _jwt.verifyToken)(["admin"]), _suggestion.getSuggestionForFeedback);
  router.post("/suggestions/:id/requestChapters", (0, _jwt.verifyToken)(["reader"]), _suggestion.changeReadingChapters);
};

exports.addSuggestionRoutes = addSuggestionRoutes;