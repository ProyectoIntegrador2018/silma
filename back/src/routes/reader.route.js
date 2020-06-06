import {
  getReaders,
  getReader,
  createReader,
  createFeedback,
  addReaderRegister
} from "@/controllers/reader.controller";
import { verifyToken } from "@/utils/jwt";

export const addReaderRoutes = (router) => {
  router.get("/readers", verifyToken(["admin"]), getReaders);
  router.get("/readers/:id", verifyToken(["reader", "admin"]), getReader);
  router.post("/register/readers", createReader);
  router.post("/register/feedback", verifyToken(["reader"]), createFeedback);
  router.post("/register/addReader", verifyToken(["writer","admin"]), addReaderRegister);

};
