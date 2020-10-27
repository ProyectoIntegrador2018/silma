"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGenreRoutes = addGenreRoutes;

var _genre = require("../controllers/genre.controller");

var _jwt = require("../utils/jwt");

var _genre2 = require("../validations/genre.validation");

function addGenreRoutes(router) {
  var moduleName = "genre";
  router.get("/".concat(moduleName, "/search"), (0, _jwt.verifyToken)(["admin"], "genreRead"), _genre.searchGenres);
  router.get("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "genreRead"), _genre.getGenreById);
  router.post("/".concat(moduleName), (0, _jwt.verifyToken)(["admin"], "genreCreate"), _genre2.onSaveMiddleware, _genre.createGenre);
  router.patch("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "genreEdit"), _genre2.onSaveMiddleware, _genre.updateGenre);
  router.delete("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "genreDelete"), _genre.deleteGenre);
}