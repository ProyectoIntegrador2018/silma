"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSaleRoutes = void 0;

var _sale = require("../controllers/sale.controller");

var _jwt = require("../utils/jwt");

var addSaleRoutes = router => {
  router.get("/sale/search", (0, _jwt.verifyToken)(["admin"], "saleRead"), _sale.searchSales);
  router.get("/sale/:id", (0, _jwt.verifyToken)(["admin"], "saleRead"), _sale.getSaleById);
  router.post("/sale", (0, _jwt.verifyToken)(["admin"], "saleCreate"), _sale.createSale);
  router.patch("/sale/:id", (0, _jwt.verifyToken)(["admin"], "saleEdit"), _sale.updateSale);
  router.delete("/sale/:id", (0, _jwt.verifyToken)(["admin"], "saleDelete"), _sale.deleteSale);
  router.get("/saleByWriter/:id", (0, _jwt.verifyToken)(["writer"]), _sale.searchSalesByWriterId);
};

exports.addSaleRoutes = addSaleRoutes;