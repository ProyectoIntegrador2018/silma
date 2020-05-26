"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTextRoutes = void 0;

var _text = require("../controllers/text.controller");

var addTextRoutes = router => {
  router.get("/texts", _text.getAllTexts);
  router.get("/texts/:id", _text.getText);
  router.get("/texts/phase/:id", _text.getTextsInPhase);
  router.post("/texts", _text.createText);
  router.post("/texts/:id/uploads", _text.uploadTextDocument);
  router.get("/texts/:id/uploads", _text.retrieveTextDocument);
  router.post("/texts/:id/reject", _text.rejectText);
  router.get("/texts/writer/:writer", _text.getTextsOfWriter);
};

exports.addTextRoutes = addTextRoutes;