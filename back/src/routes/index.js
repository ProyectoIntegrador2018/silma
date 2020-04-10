import { Router } from "express";
import { addWriterRoutes } from "./writer.route";
import { addAdminRoutes } from "./admin.route";
import { addReaderRoutes } from "./reader.route";

export const createRoutes = () => {
  const router = new Router();

  addWriterRoutes(router);
  addAdminRoutes(router);
  addReaderRoutes(router);

  return router;
};
