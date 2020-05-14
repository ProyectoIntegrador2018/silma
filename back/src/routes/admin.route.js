import {
  getAdmins,
  createAdmin,
  getAdmin,
  createGenre,
  fillGenres,
  getFeedback,
  movePhase
} from "@/controllers/admin.controller";


export const addAdminRoutes = (router) => {
  router.get("/admins", getAdmins);
  router.get("/admins/:id", getAdmin);
  router.post("/admins/register", createAdmin);
  router.post("/admins/register/genres", createGenre);
  router.post("/admins/fillGenres", fillGenres);
  router.get("/admins/feedback/:id", getFeedback);
  router.post("/admins/texts/movePhase/:id", movePhase);
};
