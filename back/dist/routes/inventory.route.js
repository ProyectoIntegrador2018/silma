"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addInventoryRoutes = void 0;

var _inventory = require("../controllers/inventory.controller");

var _jwt = require("../utils/jwt");

var addInventoryRoutes = router => {
  router.get("/inventories", (0, _jwt.verifyToken)(["admin"]), _inventory.getInventories);
  router.get("/inventory/:id", (0, _jwt.verifyToken)(), _inventory.getInventory);
  router.get("/inventoryByWriter/:writerId", (0, _jwt.verifyToken)(), _inventory.getInventoryByWriterId);
  router.post("/inventory", (0, _jwt.verifyToken)(["writer", "admin"]), _inventory.createInventory);
};

exports.addInventoryRoutes = addInventoryRoutes;