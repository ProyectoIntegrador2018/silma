import {
    searchSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
    searchSalesByWriterId
  } from "@/controllers/sale.controller";
  import { verifyToken } from "@/utils/jwt";
  
  export const addSaleRoutes = (router) => {
    router.get("/sale/search", verifyToken(["admin"], "saleRead"), searchSales);
    router.get("/sale/:id", verifyToken(["admin"], "saleRead"), getSaleById);
    router.post("/sale", verifyToken(["admin"], "saleCreate"), createSale);
    router.patch("/sale/:id", verifyToken(["admin"], "saleEdit"), updateSale);
    router.delete("/sale/:id", verifyToken(["admin"], "saleDelete"), deleteSale);
    router.get("/saleByWriter/:id", verifyToken(["writer"]), searchSalesByWriterId);
  };
  