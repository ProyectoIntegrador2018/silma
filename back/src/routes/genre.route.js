import {
  searchGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
} from "@/controllers/genre.controller";

export function addGenreRoutes(router) {
  const moduleName = "genre";
  router.get(`/${moduleName}/search`, searchGenres);
  router.get(`/${moduleName}/:id`, getGenreById);
  router.post(`/${moduleName}`, createGenre);
  router.patch(`/${moduleName}/:id`, updateGenre);
  router.delete(`/${moduleName}/:id`, deleteGenre);
}
