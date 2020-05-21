import { getAllTexts, getText, getTextsInPhase, createText, uploadTextDocument, retrieveTextDocument, getTextsOfWriter } from "@/controllers/text.controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/texts');
  },
  filename: function (req, file, cb) {
    const { id } = req.params;
    cb(null, `${id}.md`);
  }
});
const upload = multer({ storage: storage });

export const addTextRoutes = (router) => {
  router.get("/texts", getAllTexts);
  router.get("/texts/:id", getText);
  router.get("/texts/phase/:id", getTextsInPhase);
  router.post("/texts", createText);
  router.post("/texts/:id/uploads", upload.single('document'), uploadTextDocument);
  router.get("/texts/:id/uploads", retrieveTextDocument);
  router.get("/texts/writer/:writer", getTextsOfWriter);
};
