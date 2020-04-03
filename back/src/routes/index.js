import { Router } from "express";
import { addWriterRoutes } from "./writer.route";

export const createRoutes = () => {
  const router = new Router();

  addWriterRoutes(router);

  return router;
};
