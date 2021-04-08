import { Router } from "express";
import { addWriterRoutes } from "./writer.route";
import { addInventoryRoutes } from "./inventory.route";
import { addAdminRoutes } from "./admin.route";
import { addReaderRoutes } from "./reader.route";
import { addRoleRoutes } from "./role.route";
import { addTextRoutes } from "./text.route";
import { addSuggestionRoutes } from "./suggestion.route";
import { addGenreRoutes } from "./genre.route";
import { addPointOfSaleRoutes } from "./pointOfsale.route";
import { addEventRoutes } from "./event.route";
import {
  authUser,
  getAllGenres,
  getUser,
  getUsers,
  sendNotice,
  deleteUser
} from "@/controllers/user.controller";
import { verifyToken } from "@/utils/jwt";

export const createRoutes = () => {
  const router = Router();
  router.post("/user/authentication", authUser);
  router.get("/users/:id", verifyToken(), getUser);
  router.get("/user/genres", getAllGenres);
  router.get("/users", getUsers);
  router.get("/users/SendNotice/:id", sendNotice);
  router.delete("/users/DeleteUser/:id", deleteUser);
  addWriterRoutes(router);
  addAdminRoutes(router);
  addReaderRoutes(router);
  addRoleRoutes(router);
  addTextRoutes(router);
  addSuggestionRoutes(router);
  addGenreRoutes(router);
  addPointOfSaleRoutes(router);
  addEventRoutes(router);
  addInventoryRoutes(router);
  return router;
};
