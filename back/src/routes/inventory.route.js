import {
    getInventories,
    getInventory,
    getInventoryByWriterId,
    createInventory,
  } from "@/controllers/inventory.controller";
  import { verifyToken } from "@/utils/jwt";
  
  export const addInventoryRoutes = (router) => {
    router.get("/inventories", verifyToken(["admin"]), getInventories);
    router.get("/inventory/:id", verifyToken(), getInventory);
    router.get("/inventoryByWriter/:writerId", verifyToken(), getInventoryByWriterId);
    router.post("/inventory", verifyToken(["writer", "admin"]), createInventory);
  };
  