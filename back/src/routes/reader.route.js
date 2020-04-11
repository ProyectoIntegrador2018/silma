import {
  getReaders,
  getReader,
  createReader,
  
} from "@/controllers/reader.controller";

export const addReaderRoutes = (router) => {
  router.get("/readers", getReaders);
  router.get("/readers/:id", getReader);
  router.post("/register/readers", createReader);

};
