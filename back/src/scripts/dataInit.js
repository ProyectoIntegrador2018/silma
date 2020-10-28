import { UserModel } from "@/models/user.model";
import { AdminModel } from "../models/admin.model";
import { TextModel } from "../models/text.model";
import { WriterModel } from "../models/writer.model";
import { ReaderModel } from "../models/reader.model";
import { SuggestionModel } from "../models/suggestion.model";
import { GenreModel } from "../models/genre.model";
import RoleModel from "../models/role.model";
import bcrypt from "bcrypt";

async function createUser(user, role) {
  const userFound = await UserModel.findOne({ email: user.email }).select([
    "+password"
  ]);
  if (!userFound) {
    if (user.password.length < 8) {
      return { status: "Password needs to be at least 8 characters long" };
    }
    // Assigns a role to the user.
    user.roles = [role];
    user.password = bcrypt.hashSync(user.password, 10);
    const userModel = await UserModel.create(user);
    return userModel;
  }
  throw new Error("Error creating user");
}

async function fillGenres() {
  const genres = [
    "Sobrenatural (paranormal)",
    "Romance",
    "Aventura",
    "Fantasía épica (de héroes)",
    "Fantasía histórica",
    "Realismo mágico",
    "Chicas mágicas",
    "Fantasía tecnológica (ciencia ficción)",
    "Fantasía oscura",
    "Steampunk",
    "Terror",
    "Fantasía infantil",
    "Otros"
  ];
  for (const genre of genres) {
    const obj = { name: genre };
    await GenreModel.create(obj);
  }
  return await GenreModel.find({});
}

async function createRole(role) {
  const roleModel = await RoleModel.create(role);
  return roleModel;
}

async function createAdmin(user, roleId) {
  const userModel = await createUser(user, "admin");
  const adminModel = await AdminModel.create({
    user: userModel._id,
    role: roleId
  });
  return adminModel;
}

async function createReader(reader) {
  const userModel = await createUser(reader, "reader");
  const readerModel = await ReaderModel.create({
    user: userModel._id,
    ...reader
  });
  return readerModel;
}

async function createWriter(writer) {
  const userModel = await createUser(writer, "writer");
  const writerModel = await WriterModel.create({
    user: userModel._id,
    ...writer
  });
  return writerModel;
}

async function createText(text) {
  const textModel = await TextModel.create(text);
  return textModel;
}

async function deleteEverything() {
  const promiseOne = UserModel.deleteMany({});
  const promiseTwo = AdminModel.deleteMany({});
  const promiseThree = WriterModel.deleteMany({});
  const promiseFour = ReaderModel.deleteMany({});
  const promiseFive = TextModel.deleteMany({});
  const promiseSix = SuggestionModel.deleteMany({});
  const promiseSeven = GenreModel.deleteMany({});
  const promiseEight = RoleModel.deleteMany({});
  await Promise.all([
    promiseOne,
    promiseTwo,
    promiseThree,
    promiseFour,
    promiseFive,
    promiseSix,
    promiseSeven,
    promiseEight
  ]);
}

export async function createEverything() {
  const rolesExists = await RoleModel.find();
  if (rolesExists.length > 0) return;
  await deleteEverything();
  const superAdminRole = await createRole({
    code: "superAdmin",
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
    genreDelete: true
  });
  console.log("Role 1 created successfully");
  const admin1 = await createAdmin(
    {
      name: "Admin 1",
      password: "prueba12345",
      email: "admin1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "Mexico"
    },
    superAdminRole._id
  );
  console.log("Admin 1 created successfully");
  const admin2 = await createAdmin(
    {
      name: "Admin 2",
      password: "prueba12345",
      email: "admin2@gmail.com",
      birthdate: "12/12/1996",
      phone: "8116690318",
      nationality: "Mexico"
    },
    superAdminRole._id
  );
  console.log("Admin 2 created successfully");
  const genres = await fillGenres();
  console.log("Genres created successfully");
  const genreIds = genres.splice(0, 3).map((x) => x._id);
  const reader1 = await createReader({
    name: "Reader 1",
    password: "prueba12345",
    email: "reader1@gmail.com",
    birthdate: "12/12/2000",
    phone: "8116690319",
    nationality: "Mexico",
    readingProficiency: "4 to 6",
    facebookLink: "https://www.facebook.com/reader1",
    readFrom: "12-01-2019",
    readTill: "12-01-2020",
    preferences: genreIds
  });
  console.log("Reader 1 created successfully");
  const reader2 = await createReader({
    name: "Reader 2",
    password: "prueba12345",
    email: "reader2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690319",
    nationality: "Mexico",
    readingProficiency: "4 to 6",
    facebookLink: "https://www.facebook.com/reader2",
    readFrom: "12-01-2019",
    readTill: "12-01-2020",
    preferences: genreIds
  });
  console.log("Reader 2 created successfully");
  const writer1 = await createWriter({
    name: "Writer 1",
    password: "prueba12345",
    email: "writer1@gmail.com",
    birthdate: "12/12/2000",
    phone: "8116690319",
    nationality: "Mexico",
    pseudonym: "writer1"
  });
  console.log("Writer 1 created successfully");
  const writer2 = await createWriter({
    name: "Writer 2",
    password: "prueba12345",
    email: "writer2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690319",
    nationality: "Mexico",
    pseudonym: "writer2"
  });
  console.log("Writer 2 created successfully");
  const text1 = await createText({
    writer: writer1._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text A",
    registerNumber: "123asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120,
    numberOfChapters: 50
  });
  console.log("Text 1 created successfully");
  const text2 = await createText({
    writer: writer1._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text B",
    registerNumber: "123asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120,
    numberOfChapters: 30
  });
  console.log("Text 2 created successfully");
}
