import { getAllTexts, getText, getTextsInPhase, createText } from "@/controllers/text.controller";

export const addTextRoutes = (router) => {
  router.get("/texts", getAllTexts);
  router.get("/texts/:id", getText);
  router.get("/texts/phase/:id", getTextsInPhase);
  router.post("/texts", createText);
};
