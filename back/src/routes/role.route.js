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
  router.get("/role/:id", verifyToken(["admin"], "roleRead"), getById);
  router.get("/role", verifyToken(["admin"], "roleRead"), list);
  router.post(
    "/role",
    verifyToken(["admin"], "roleCreate"),
    onSaveMiddleware,
    create
  );
  router.patch(
    "/role/:id",
    verifyToken(["admin"], "roleEdit"),
    onSaveMiddleware,
    update
  );
  router.delete("/role/:id", verifyToken(["admin", "roleDelete"]), deleteRole);
};
