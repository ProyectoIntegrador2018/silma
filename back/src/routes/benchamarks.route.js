import {
    getTimeBenchmarks,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "@/controllers/benchmarks.controller";
import { verifyToken } from "@/utils/jwt";

export const addBenchmarkRoutes = (router) => {
    router.get("/timeBenchmarks", verifyToken(["admin"]), getTimeBenchmarks);
};
  