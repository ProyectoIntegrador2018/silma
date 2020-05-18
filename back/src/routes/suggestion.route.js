import {
  rejectSuggestion,
  acceptSuggestion,
  completeSuggestion
} from "@/controllers/suggestion.controller";


export const addSuggestionRoutes = (router) => {
  router.post("/suggestions/:id/reject", rejectSuggestion);
  router.post("/suggestions/:id/accept", acceptSuggestion);
  router.post("/suggestions/:id/complete", completeSuggestion);
};
