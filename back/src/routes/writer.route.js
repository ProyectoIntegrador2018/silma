import {
  getWriter,
  createWriter,
  getWriters
} from "@/controllers/writer.controller";

export const addWriterRoutes = router => {
  router.get("/writers", getWriters);
  router.get("/writers/:id", getWriter);
  router.post("/writers", createWriter);
};
