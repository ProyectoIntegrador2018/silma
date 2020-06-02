import {
  getWriter,
  createWriter,
  getWriters,
} from "@/controllers/writer.controller";
import { verifyToken } from "@/utils/jwt";

export const addWriterRoutes = router => {
  router.get("/writers", verifyToken(["admin"]), getWriters);
  router.get("/writers/:id", verifyToken(), getWriter);
  router.post("/register/writers", createWriter);
};

