import {
    getTimeBenchmarks,
    getTimeBenchmarksByWriter,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "@/controllers/benchmarks.controller";
import { verifyToken } from "@/utils/jwt";

export const addBenchmarkRoutes = (router) => {
    router.get("/timeBenchmarks", verifyToken(["admin"]), getTimeBenchmarks);
    router.get("/timeBenchmarksByWriter", verifyToken(["admin"]), getTimeBenchmarksByWriter);
};
  