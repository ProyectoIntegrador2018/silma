"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTextRoutes = void 0;

var _text = require("../controllers/text.controller");

var _jwt = require("../utils/jwt");

var addTextRoutes = router => {
  router.get("/texts", (0, _jwt.verifyToken)(["admin"]), _text.getAllTexts);
  router.get("/texts/:id", (0, _jwt.verifyToken)(), _text.getText);
  router.get("/texts/phase/:id", (0, _jwt.verifyToken)(["admin"]), _text.getTextsInPhase);
  router.post("/texts", (0, _jwt.verifyToken)(["writer"]), _text.createText);
  router.post("/texts/:id/uploads", (0, _jwt.verifyToken)(["writer"]), _text.uploadTextDocument);
  router.get("/texts/:id/uploads", (0, _jwt.verifyToken)(), _text.retrieveTextDocument);
  router.post("/texts/:id/reject", (0, _jwt.verifyToken)(["admin"]), _text.rejectText);
  router.get("/texts/writer/:writer", (0, _jwt.verifyToken)(), _text.getTextsOfWriter);
};

exports.addTextRoutes = addTextRoutes;