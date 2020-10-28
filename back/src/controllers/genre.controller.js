import * as GenreLogic from "@/logics/genre.logic";
import { send } from "@/utils/errors";

export const searchGenres = (request, response) => {
  send(response, async () => {
    const query = request.query;
    return await GenreLogic.searchGenres(query);
  });
};

export const getGenreById = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await GenreLogic.getGenreById(id);
  });
};

export const createGenre = (request, response) => {
  send(response, async () => {
    const genre = request.body;
    return await GenreLogic.createGenre(genre);
  });
};

export const updateGenre = (request, response) => {
  send(response, async () => {
    const genre = request.body;
    const id = request.params.id;
    return await GenreLogic.updateGenre(id, genre);
  });
};

export const deleteGenre = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await GenreLogic.deleteGenre(id);
  });
};
