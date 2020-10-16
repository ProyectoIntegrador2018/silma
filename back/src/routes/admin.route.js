import {
  getAdmins,
  createAdmin,
  getAdmin,
  getFeedback,
  movePhase,
  getFeedbackIdBySuggestion
} from "@/controllers/admin.controller";

import {
  getTextSuggestions,
  createSuggestionAdmin,
  deleteSuggestionAdmin
} from "@/controllers/suggestion.controller";
import { verifyToken } from "@/utils/jwt";

export const addAdminRoutes = (router) => {
  router.get("/admins", verifyToken(["admin"]), getAdmins);
  router.get("/admins/:id", verifyToken(["admin"]), getAdmin);
  router.post("/admins/register", verifyToken(["admin"]), createAdmin);
  router.get(
    "/admins/feedback/:id",
    verifyToken(["admin", "reader"]),
    getFeedback
  );
  router.post("/admins/texts/movePhase/:id", verifyToken(["admin"]), movePhase);
  router.get(
    "/admins/suggestions/getTextSuggestions/:id",
    verifyToken(["admin", "reader"]),
    getTextSuggestions
  );
  router.post(
    "/admins/suggestions/createSuggestions/",
    verifyToken(["admin"]),
    createSuggestionAdmin
  );
  router.delete(
    "/admins/suggestions/deleteSuggestion/:id",
    verifyToken(["admin"]),
    deleteSuggestionAdmin
  );
  router.get(
    "/admins/feedbacks/:id",
    verifyToken(["admin"]),
    getFeedbackIdBySuggestion
  );
};
