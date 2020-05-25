import {
  rejectSuggestion,
  acceptSuggestion,
  completeSuggestion,
  getSuggestionFromReader,
  getAllSuggestionsFromReader,
  getReadersWithoutSuggestion
} from "@/controllers/suggestion.controller";


export const addSuggestionRoutes = (router) => {
  router.post("/suggestions/:id/reject", rejectSuggestion);
  router.post("/suggestions/:id/accept", acceptSuggestion);
  router.post("/suggestions/:id/complete", completeSuggestion);
  router.get("/suggestions/getSuggestion/:id", getSuggestionFromReader);
  router.get("/suggestions/getReadersWithoutSuggestion/", getReadersWithoutSuggestion);
  router.get("/suggestions/getAllSuggestions/:id", getAllSuggestionsFromReader);
};
