import {
    searchPoS,
    getPoSById,
    createPoS,
    updatePoS,
    deletePoS
  } from "@/controllers/pointOfSale.controller";
  import { verifyToken } from "@/utils/jwt";
  import { onSaveMiddleware } from "../validations/pointOfSale.validation";
  
  export function addPointOfSaleRoutes(router) {
    const moduleName = "PointOfSale";
    router.get(
      `/${moduleName}/search`,
      verifyToken(["admin"], "pointOfSaleRead"),
      searchPoS
    );
    router.get(
      `/${moduleName}/:id`,
      verifyToken(["admin"], "pointOfSaleRead"),
      getPoSById
    );
    router.post(
      `/${moduleName}`,
      verifyToken(["admin"], "pointOfSaleCreate"),
      onSaveMiddleware,
      createPoS
    );
    router.patch(
      `/${moduleName}/:id`,
      verifyToken(["admin"], "pointOfSaleEdit"),
      onSaveMiddleware,
      updatePoS
    );
    router.delete(
      `/${moduleName}/:id`,
      verifyToken(["admin"], "pointOfSaleDelete"),
      deletePoS
    );
  }
  