import {
  getAdmins,
  createAdmin,
  getAdmin
} from "@/controllers/admin.controller";

export const addAdminRoutes = (router) => {
  router.get("/admins", getAdmins);
  router.get("/admins/:id", getAdmin);
  router.post("/admins/register", createAdmin);
};
