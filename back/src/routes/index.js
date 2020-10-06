import { Router } from "express";
import { addWriterRoutes } from "./writer.route";
import { addAdminRoutes } from "./admin.route";
import { addReaderRoutes } from "./reader.route";
import { addTextRoutes } from "./text.route";
import { addSuggestionRoutes } from "./suggestion.route";
import { authUser, getAllGenres, getUser } from "@/controllers/user.controller";
import { verifyToken } from "@/utils/jwt";

export const createRoutes = () => {
  const router = new Router();
  router.post("/user/authentication", authUser);
  router.get("/users/:id", verifyToken(), getUser);
  router.get("/user/genres", getAllGenres);
  addWriterRoutes(router);
  addAdminRoutes(router);
  addReaderRoutes(router);
  addTextRoutes(router);
  addSuggestionRoutes(router);

  return router;
};
