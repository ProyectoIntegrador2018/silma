"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProductRoutes = void 0;

var _product = require("../controllers/product.controller");

var _jwt = require("../utils/jwt");

var addProductRoutes = router => {
  router.get("/products", (0, _jwt.verifyToken)(["admin"]), _product.getProducts);
  router.get("/product/:id", (0, _jwt.verifyToken)(), _product.getProduct);
  router.post("/product", (0, _jwt.verifyToken)(["writer", "admin"]), _product.createProduct);
  router.post("/productImage/:id", (0, _jwt.verifyToken)(["writer", "admin"]), _product.uploadImage);
  router.get("/productImage/:id", (0, _jwt.verifyToken)(["writer", "admin"]), _product.retrieveImage);
  router.patch("/product/edit", (0, _jwt.verifyToken)(["writer", "admin"]), _product.editProduct);
  router.patch("/product/delete", (0, _jwt.verifyToken)(["writer", "admin"]), _product.deleteProduct);
};

exports.addProductRoutes = addProductRoutes;