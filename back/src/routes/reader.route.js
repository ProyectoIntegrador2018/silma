import {
  getReaders,
  getReader,
  createReader,
  createFeedback
} from "@/controllers/reader.controller";

export const addReaderRoutes = (router) => {
  router.get("/readers", getReaders);
  router.get("/readers/:id", getReader);
  router.post("/register/readers", createReader);
  router.post("/register/feedback", createFeedback);
};
