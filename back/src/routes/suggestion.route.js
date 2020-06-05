import {
  rejectSuggestion,
  acceptSuggestion,
  completeSuggestion,
  getSuggestionFromReader,
  getAllSuggestionsFromReader,
  getSuggestionFromReaderDashboard,
  getAllSuggestionsFromReaderDashboard,
  getReadersWithoutSuggestion,
  getTextSuggestions,
  getSuggestion,
  getSuggestionForFeedback
} from "@/controllers/suggestion.controller";
import { verifyToken } from "@/utils/jwt";

export const addSuggestionRoutes = (router) => {
  router.post("/suggestions/:id/reject", verifyToken(["reader"]), rejectSuggestion);
  router.post("/suggestions/:id/accept", verifyToken(["reader"]), acceptSuggestion);
  router.post("/suggestions/:id/complete", verifyToken(["reader"]), completeSuggestion);
  router.get("/suggestions/getSuggestion/:id", verifyToken(["admin"]), getSuggestionFromReader);
  router.get("/suggestions/getReadersWithoutSuggestion/", verifyToken(["admin"]), getReadersWithoutSuggestion);
  router.get("/suggestions/getAllSuggestions/:id", verifyToken(["admin", "reader"]), getAllSuggestionsFromReader);
  router.get("/suggestions/getSuggestionDashboard/:id", verifyToken(["reader"]), getSuggestionFromReaderDashboard);
  router.get("/suggestions/getAllSuggestionsDashboard/:id", verifyToken(["reader"]), getAllSuggestionsFromReaderDashboard);
  router.get("/suggestions/getTextSuggestions/:id", verifyToken(["admin"]), getTextSuggestions);
  router.get("/suggestions/:id", verifyToken(["admin", "reader"]), getSuggestion);
  router.get("/suggestions/feedback/:id", verifyToken(["admin"]), getSuggestionForFeedback)
};
