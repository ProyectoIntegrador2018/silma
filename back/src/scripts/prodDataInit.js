import { GenreModel } from "@/models/genre.model";
import RoleModel from "@/models/role.model";

async function createRole(role) {
  const newRole = await RoleModel.create(role);
  return newRole;
}

async function createGenre(genre) {
  const newGenre = await GenreModel.create(genre);
  return newGenre;
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
    { name: "Sobrenatural (paranormal)", description: "", subgenres: [] },
    { name: "Romance", description: "", subgenres: [] },
    { name: "Aventura", description: "", subgenres: [] },
    { name: "Fantasía épica (de héroes)", description: "", subgenres: [] },
    { name: "Fantasía histórica", description: "", subgenres: [] },
    { name: "Realismo mágico", description: "", subgenres: [] },
    { name: "Chicas mágicas", description: "", subgenres: [] },
    {
      name: "Fantasía tecnológica (ciencia ficción)",
      description: "",
      subgenres: []
    },
    { name: "Fantasía oscura", description: "", subgenres: [] },
    { name: "Steampunk", description: "", subgenres: [] },
    { name: "Terror", description: "", subgenres: [] },
    { name: "Fantasía infantil", description: "", subgenres: [] },
    { name: "Otros", description: "", subgenres: [] }
  ];
  const promises = genres.map((genre) => createGenre(genre));
  await Promise.all(promises);
  console.log("All genres created");
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
