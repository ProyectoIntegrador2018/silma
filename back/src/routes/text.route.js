import { getAllTexts, getText, getTextsInPhase, createText, uploadTextDocument, retrieveTextDocument, rejectText, getTextsOfWriter } from "@/controllers/text.controller";

export const addTextRoutes = (router) => {
  router.get("/texts", getAllTexts);
  router.get("/texts/:id", getText);
  router.get("/texts/phase/:id", getTextsInPhase);
  router.post("/texts", createText);
  router.post("/texts/:id/uploads", uploadTextDocument);
  router.get("/texts/:id/uploads", retrieveTextDocument);
  router.post("/texts/:id/reject", rejectText);
  router.get("/texts/writer/:writer", getTextsOfWriter);
};
