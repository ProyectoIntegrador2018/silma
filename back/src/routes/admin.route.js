import {
  getAdmins,
  createAdmin,
  getAdmin,
  createGenre,
  fillGenres,
  getFeedback,
  movePhase
} from "@/controllers/admin.controller";

import {
  getTextSuggestions,
  createSuggestionAdmin,
  deleteSuggestionAdmin
} from "@/controllers/suggestion.controller";

export const addAdminRoutes = (router) => {
  router.get("/admins", getAdmins);
  router.get("/admins/:id", getAdmin);
  router.post("/admins/register", createAdmin);
  router.post("/admins/register/genres", createGenre);
  router.post("/admins/fillGenres", fillGenres);
  router.get("/admins/feedback/:id", getFeedback);
  router.post("/admins/texts/movePhase/:id", movePhase);
  router.get("/admins/suggestions/getTextSuggestions/:id", getTextSuggestions);
  router.post("/admins/suggestions/createSuggestions/", createSuggestionAdmin);
  router.delete("/admins/suggestions/deleteSuggestion/:id",deleteSuggestionAdmin)

};
