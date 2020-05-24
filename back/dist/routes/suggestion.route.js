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
};

exports.addSuggestionRoutes = addSuggestionRoutes;