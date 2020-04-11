import { Router } from "express";
import { addWriterRoutes } from "./writer.route";
import { addAdminRoutes } from "./admin.route";
import { addReaderRoutes } from "./reader.route";

import {
  authUser,
} from "@/controllers/user.controller";

export const createRoutes = () => {
  const router = new Router();
  router.post("/user/authentication", authUser);

  addWriterRoutes(router);
  addAdminRoutes(router);
  addReaderRoutes(router);

  return router;
};
