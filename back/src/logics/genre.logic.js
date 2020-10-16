import { GenreModel } from "@/models/genre.model";
import { SubgenreModel } from "@/models/subgenre.model";

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
  const newGenre = await GenreModel.create(genre);
  const subgenresPromises = subgenres.map((subgenre) => {
    const subgenreWithId = { ...subgenre, genre: newGenre._id };
    return SubgenreModel.create(subgenreWithId);
  });
  const newSubgenres = await Promise.all(subgenresPromises);
  return {
    ...newGenre.toJSON(),
    subgenres: newSubgenres.map((x) => x.toJSON())
  };
}

export async function updateGenre(id, genre) {
  const { subgenres, subgenresToDelete } = genre;
  const updatedGenre = await GenreModel.findByIdAndUpdate(id, genre, {
    useFindAndModify: false
  });
  const subgenresPromises = subgenres.map((subgenre) => {
    if (subgenre._id)
      return SubgenreModel.findByIdAndUpdate(subgenre._id, subgenre, {
        useFindAndModify: false
      });
    const subgenreWithId = { ...subgenre, genre: updatedGenre._id };
    return SubgenreModel.create(subgenreWithId);
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
  const deletedSubgenresPromise = SubgenreModel.deleteMany({ genre: genreId });
  const deletedGenrePromise = GenreModel.deleteOne({ _id: genreId });
  const [deletedSubgenres, deletedGenre] = await Promise.all([
    deletedSubgenresPromise,
    deletedGenrePromise
  ]);
  return { deletedSubgenres, deletedGenre };
}
