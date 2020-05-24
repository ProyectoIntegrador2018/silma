"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTextRoutes = void 0;

var _text = require("../controllers/text.controller");

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/uploads/texts');
  },
  filename: function filename(req, file, cb) {
    var {
      id
    } = req.params;
    cb(null, "".concat(id, ".md"));
  }
});

var upload = (0, _multer.default)({
  storage: storage
});

var addTextRoutes = router => {
  router.get("/texts", _text.getAllTexts);
  router.get("/texts/:id", _text.getText);
  router.get("/texts/phase/:id", _text.getTextsInPhase);
  router.post("/texts", _text.createText);
  router.post("/texts/:id/uploads", upload.single('document'), _text.uploadTextDocument);
  router.get("/texts/:id/uploads", _text.retrieveTextDocument);
  router.get("/texts/writer/:writer", _text.getTextsOfWriter);
};

exports.addTextRoutes = addTextRoutes;