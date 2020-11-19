"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPointOfSaleRoutes = addPointOfSaleRoutes;

var _pointOfSale = require("../controllers/pointOfSale.controller");

var _jwt = require("../utils/jwt");

var _pointOfSale2 = require("../validations/pointOfSale.validation");

function addPointOfSaleRoutes(router) {
  var moduleName = "PointOfSale";
  router.get("/".concat(moduleName, "/search"), (0, _jwt.verifyToken)(["admin"], "pointOfSaleRead"), _pointOfSale.searchPoS);
  router.get("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "pointOfSaleRead"), _pointOfSale.getPoSById);
  router.post("/".concat(moduleName), (0, _jwt.verifyToken)(["admin"], "pointOfSaleCreate"), _pointOfSale2.onSaveMiddleware, _pointOfSale.createPoS);
  router.patch("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "pointOfSaleEdit"), _pointOfSale2.onSaveMiddleware, _pointOfSale.updatePoS);
  router.delete("/".concat(moduleName, "/:id"), (0, _jwt.verifyToken)(["admin"], "pointOfSaleDelete"), _pointOfSale.deletePoS);
}