import {
    searchEvent,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
  } from "@/controllers/event.controller";
  import { verifyToken } from "@/utils/jwt";
  import { onSaveMiddleware } from "../validations/event.validation";
  
  export function addEventRoutes(router) {
    const moduleName = "event";
    router.get(
      `/${moduleName}/search`,
      verifyToken(["admin"], "eventRead"),
      searchEvent
    );
    router.get(
      `/${moduleName}/:id`,
      verifyToken(["admin"], "eventRead"),
      getEventById
    );
    router.post(
      `/${moduleName}`,
      verifyToken(["admin"], "eventCreate"),
      onSaveMiddleware,
      createEvent
    );
    router.patch(
      `/${moduleName}/:id`,
      verifyToken(["admin"], "eventEdit"),
      onSaveMiddleware,
      updateEvent
    );
    router.delete(
      `/${moduleName}/:id`,
      verifyToken(["admin"], "eventDelete"),
      deleteEvent
    );
  }
  