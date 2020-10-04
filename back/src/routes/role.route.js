import {
  getById,
  list,
  create,
  update,
  deleteRole
} from "@/controllers/role.controller";
import { verifyToken } from "@/utils/jwt";
import { onSaveMiddleware } from "../validations/role.validation";

export const addRoleRoutes = (router) => {
  router.get("/role/:id", verifyToken(["admin"]), getById);
  router.get("/role", verifyToken(["admin"]), list);
  router.post("/role", verifyToken(["admin"]), onSaveMiddleware, create);
  router.patch("/role/:id", verifyToken(["admin"]), onSaveMiddleware, update);
  router.delete("/role/:id", verifyToken(["admin"]), deleteRole);
};
