"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSuggestionRoutes = void 0;

var _suggestion = require("../controllers/suggestion.controller");

var addSuggestionRoutes = router => {
  router.post("/suggestions/:id/reject", _suggestion.rejectSuggestion);
  router.post("/suggestions/:id/accept", _suggestion.acceptSuggestion);
  router.post("/suggestions/:id/complete", _suggestion.completeSuggestion);
  router.get("/suggestions/getSuggestion/:id", _suggestion.getSuggestionFromReader);
  router.get("/suggestions/getReadersWithoutSuggestion/", _suggestion.getReadersWithoutSuggestion);
  router.get("/suggestions/getAllSuggestions/:id", _suggestion.getAllSuggestionsFromReader);
  router.get("/suggestions/getSuggestionDashboard/:id", _suggestion.getSuggestionFromReaderDashboard);
  router.get("/suggestions/getAllSuggestionsDashboard/:id", _suggestion.getAllSuggestionsFromReaderDashboard);
  router.get("/suggestions/getTextSuggestions/:id", _suggestion.getTextSuggestions);
  router.get("/suggestions/:id", _suggestion.getSuggestion);
};

exports.addSuggestionRoutes = addSuggestionRoutes;