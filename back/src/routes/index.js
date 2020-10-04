import { Router } from "express";
import { addWriterRoutes } from "./writer.route";
import { addAdminRoutes } from "./admin.route";
import { addReaderRoutes } from "./reader.route";
import { addRoleRoutes } from "./role.route";
import { addTextRoutes } from "./text.route";
import { addSuggestionRoutes } from "./suggestion.route";
import { authUser, getAllGenres, getUser } from "@/controllers/user.controller";
import { verifyToken } from "@/utils/jwt";

export const createRoutes = () => {
  const router = Router();
  router.post("/user/authentication", authUser);
  router.get("/users/:id", verifyToken(), getUser);
  router.get("/user/genres", getAllGenres);
  addWriterRoutes(router);
  addAdminRoutes(router);
  addReaderRoutes(router);
  addRoleRoutes(router);
  addTextRoutes(router);
  addSuggestionRoutes(router);

  return router;
};
