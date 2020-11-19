import { GenreModel } from "@/models/genre.model";
import RoleModel from "@/models/role.model";
import * as GenreLogic from "@/logics/genre.logic";

async function createRole(role) {
  const newRole = await RoleModel.create(role);
  return newRole;
}

async function createAllRoles() {
  const roles = [
    {
      code: "super_admin",
      name: "Super Administrador",
      isBaseRole: true,
      readingRead: true,
      readingCreate: true,
      readingEdit: true,
      readingDelete: true,
      bookRead: true,
      bookCreate: true,
      bookEdit: true,
      bookDelete: true,
      phaseRead: true,
      phaseCreate: true,
      phaseEdit: true,
      phaseDelete: true,
      userRead: true,
      userCreate: true,
      userEdit: true,
      userDelete: true,
      eventRead: true,
      eventCreate: true,
      eventEdit: true,
      eventDelete: true,
      reportRead: true,
      reportCreate: true,
      reportEdit: true,
      reportDelete: true,
      roleRead: true,
      roleCreate: true,
      roleEdit: true,
      roleDelete: true,
      genreRead: true,
      genreCreate: true,
      genreEdit: true,
      genreDelete: true,
      advancePhase: true,
      pointOfSaleRead: true,
      pointOfSaleCreate: true,
      pointOfSaleEdit: true,
      pointOfSaleDelete: true,
      advancePhase: true
    }
  ];
  const promises = roles.map((role) => createRole(role));
  await Promise.all(promises);
  console.log("All roles created");
}

async function createAllGenres() {
  const genres = [
    { name: "Sobrenatural (paranormal)", description: "", subgenres: [{name: "Sobrenatural 1", description: "Descripcion"}] },
    { name: "Romance", description: "", subgenres: [{name: "Romance 1", description: "Descripcion"}] },
    { name: "Aventura", description: "", subgenres: [{name: "Aventura 1", description: "Descripcion"}] },
    { name: "Fantasía épica (de héroes)", description: "", subgenres: [{name: "Fantasía épica (de héroes) 1", description: "Descripcion"}] },
    { name: "Fantasía histórica", description: "", subgenres: [{name: "Fantasía histórica 1", description: "Descripcion"}] },
    { name: "Realismo mágico", description: "", subgenres: [{name: "Realismo mágico 1", description: "Descripcion"}] },
    { name: "Chicas mágicas", description: "", subgenres: [{name: "Chicas mágicas 1", description: "Descripcion"}] },
    {
      name: "Fantasía tecnológica (ciencia ficción)",
      description: "",
      subgenres: [{name: "Fantasía tecnológica (ciencia ficción) 1", description: "Descripcion"}]
    },
    { name: "Fantasía oscura", description: "", subgenres: [{name: "Fantasía oscura 1", description: "Descripcion"}] },
    { name: "Steampunk", description: "", subgenres: [{name: "Steampunk 1", description: "Descripcion"}] },
    { name: "Terror", description: "", subgenres: [{name: "Terror 1", description: "Descripcion"}] },
    { name: "Fantasía infantil", description: "", subgenres: [{name: "Fantasía infantil 1", description: "Descripcion"}] },
  ];
  const promises = genres.map((genre) => GenreLogic.createGenre(genre));
  await Promise.all(promises);
  console.log("All genres created")
  return await GenreModel.find({});
}

export async function runProdDataInit() {
  try {
    const countPromises = [
      RoleModel.countDocuments(),
      GenreModel.countDocuments()
    ];
    const [rolesCount, genresCount] = await Promise.all(countPromises);
    if (rolesCount === 0) await createAllRoles();
    if (genresCount === 0) await createAllGenres();
  } catch (error) {
    console.error(error);
  }
}
