import {
  searchGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
} from "@/controllers/genre.controller";
import { onSaveMiddleware } from "../validations/genre.validation";

export function addGenreRoutes(router) {
  const moduleName = "genre";
  router.get(`/${moduleName}/search`, searchGenres);
  router.get(`/${moduleName}/:id`, getGenreById);
  router.post(`/${moduleName}`, onSaveMiddleware, createGenre);
  router.patch(`/${moduleName}/:id`, onSaveMiddleware, updateGenre);
  router.delete(`/${moduleName}/:id`, deleteGenre);
}
