import { Router } from "express";
import { addWriterRoutes } from "./writer.route";
import { addAdminRoutes } from "./admin.route";

export const createRoutes = () => {
  const router = new Router();

  addWriterRoutes(router);
  addAdminRoutes(router);

  return router;
};
