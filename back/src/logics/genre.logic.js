import { GenreModel } from "@/models/genre.model";
import { SubgenreModel } from "@/models/subgenre.model";
import * as GenreValidation from "../validations/genre.validation";

export async function searchGenres(query) {
  const genres = await GenreModel.find();
  return genres;
}

export async function getGenreById(genreId) {
  const genrePromise = GenreModel.findById(genreId);
  const subgenresPromise = SubgenreModel.find({ genre: genreId });
  const [genre, subgenres] = await Promise.all([
    genrePromise,
    subgenresPromise
  ]);
  return {
    ...genre.toJSON(),
    subgenres: subgenres.map((x) => x.toJSON())
  };
}

export async function createGenre(genre) {
  const { subgenres } = genre;
  const newGenreModel = new GenreModel(genre);
  const newGenre = await newGenreModel.save();
  const subgenresPromises = subgenres.map((subgenre) => {
    const subgenreWithId = { ...subgenre, genre: newGenre._id };
    const subgenreModel = new SubgenreModel(subgenreWithId);
    return subgenreModel.save();
  });
  const newSubgenres = await Promise.all(subgenresPromises);
  return {
    ...newGenre.toJSON(),
    subgenres: newSubgenres.map((x) => x.toJSON())
  };
}

export async function updateGenre(id, genre) {
  const { subgenres, subgenresToDelete } = genre;
  const genreModel = await GenreModel.findById(id);
  const updatedGenreModel = Object.assign(genreModel, genre);
  const updatedGenre = await updatedGenreModel.save();

  const subgenresPromises = subgenres.map(async (subgenre) => {
    if (subgenre._id) {
      const subgenreModel = await SubgenreModel.findById(subgenre._id);
      const updatedSubgenre = Object.assign(subgenreModel, subgenre);
      return updatedSubgenre.save();
    }

    const subgenreWithId = { ...subgenre, genre: updatedGenre._id };
    const newSubgenre = new SubgenreModel(subgenreWithId);
    return newSubgenre.save();
  });
  const subgenresToDeletePromises = subgenresToDelete
    .filter((x) => !!x._id)
    .map((subgenre) => SubgenreModel.deleteOne({ _id: subgenre._id }));

  const [updatedSubgenres, _] = await Promise.all([
    Promise.all(subgenresPromises),
    Promise.all(subgenresToDeletePromises)
  ]);

  return {
    ...updatedGenre.toJSON(),
    subgenres: updatedSubgenres.map((x) => x.toJSON())
  };
}

export async function deleteGenre(genreId) {
  const subgenresToDeletePromise = SubgenreModel.find({ genre: genreId });
  const genreToDeletePromise = GenreModel.findById(genreId);
  const [subgenresToDelete, genreToDelete] = await Promise.all([
    subgenresToDeletePromise,
    genreToDeletePromise
  ]);
  // TODO - Validate subgenres to delete

  // Validate genre delete
  await GenreValidation.onDeleteValidations(genreToDelete);

  const deletedSubgenres = await Promise.all(
    subgenresToDelete.map((subgenre) => subgenre.deleteOne())
  );
  const deletedGenre = await genreToDelete.deleteOne();

  return { deletedSubgenres, deletedGenre };
}
