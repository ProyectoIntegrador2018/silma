import {
    getInventories,
    getInventory,
    getInventoryByWriterId,
    createInventory,
    addItems,
    editItem,
    removeItem
  } from "@/controllers/inventory.controller";
  import { verifyToken } from "@/utils/jwt";
  
  export const addInventoryRoutes = (router) => {
    router.get("/inventories", verifyToken(["admin"]), getInventories);
    router.get("/inventory/:id", verifyToken(), getInventory);
    router.get("/inventoryByWriter/:writerId", verifyToken(), getInventoryByWriterId);
    router.post("/inventory", createInventory);
    router.post(
      "/inventory/addItems",
      verifyToken(["writer", "admin"]),
      addItems
    );
    router.patch(
        "/inventory/editItem",
        verifyToken(["writer", "admin"]),
        editItem
    );
    router.patch(
        "/inventory/removeItem",
        verifyToken(["writer", "admin"]),
        removeItem
    );
  };
  