import {
  searchGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
} from "@/controllers/genre.controller";
import { verifyToken } from "@/utils/jwt";
import { onSaveMiddleware } from "../validations/genre.validation";

export function addGenreRoutes(router) {
  const moduleName = "genre";
  router.get(
    `/${moduleName}/search`,
    verifyToken(["admin"], "genreRead"),
    searchGenres
  );
  router.get(
    `/${moduleName}/:id`,
    verifyToken(["admin"], "genreRead"),
    getGenreById
  );
  router.post(
    `/${moduleName}`,
    verifyToken(["admin"], "genreCreate"),
    onSaveMiddleware,
    createGenre
  );
  router.patch(
    `/${moduleName}/:id`,
    verifyToken(["admin"], "genreEdit"),
    onSaveMiddleware,
    updateGenre
  );
  router.delete(
    `/${moduleName}/:id`,
    verifyToken(["admin"], "genreDelete"),
    deleteGenre
  );
}
