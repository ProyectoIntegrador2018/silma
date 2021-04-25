import {
    getProduct,
    getProducts,
    createProduct,
    editProduct,
    deleteProduct,
  } from "@/controllers/product.controller";
  import { verifyToken } from "@/utils/jwt";
  
  export const addProductRoutes = (router) => {
    router.get("/products", verifyToken(["admin"]), getProducts);
    router.get("/product/:id", verifyToken(), getProduct);
    router.post("/product", verifyToken(["writer", "admin"]), createProduct);
    router.patch(
        "/product/edit",
        verifyToken(["writer", "admin"]),
        editProduct
    );
    router.patch(
        "/product/delete",
        verifyToken(["writer", "admin"]),
        deleteProduct
    );
  };
  