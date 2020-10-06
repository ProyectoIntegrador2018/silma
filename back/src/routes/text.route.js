import {
  getAllTexts,
  getText,
  getTextsInPhase,
  createText,
  uploadTextDocument,
  retrieveTextDocument,
  rejectText,
  getTextsOfWriter
} from "@/controllers/text.controller";
import { verifyToken } from "@/utils/jwt";

export const addTextRoutes = (router) => {
  router.get("/texts", verifyToken(["admin"]), getAllTexts);
  router.get("/texts/:id", verifyToken(), getText);
  router.get("/texts/phase/:id", verifyToken(["admin"]), getTextsInPhase);
  router.post("/texts", verifyToken(["writer"]), createText);
  router.post(
    "/texts/:id/uploads",
    verifyToken(["writer"]),
    uploadTextDocument
  );
  router.get("/texts/:id/uploads", verifyToken(), retrieveTextDocument);
  router.post("/texts/:id/reject", verifyToken(["admin"]), rejectText);
  router.get("/texts/writer/:writer", verifyToken(), getTextsOfWriter);
};
