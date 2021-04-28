import { UserModel } from "@/models/user.model";
import { AdminModel } from "../models/admin.model";
import { TextModel } from "../models/text.model";
import { WriterModel } from "../models/writer.model";
import { ReaderModel } from "../models/reader.model";
import { SuggestionModel } from "../models/suggestion.model";
import { GenreModel } from "../models/genre.model";
import { SubgenreModel } from "../models/subgenre.model";
import * as GenreLogic from "@/logics/genre.logic";
import RoleModel from "../models/role.model";
import { ProductModel } from "../models/product.model";
import { InventoryModel } from "../models/inventory.model";
import { SaleModel } from "../models/sale.model";
import { EventModel } from "../models/event.model";
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
  return await GenreModel.aggregate([
    {
       $lookup: {
         from: "subgenres",
         localField: "_id",
         foreignField: "genre",
         as: 'subgenres'
       }
    }
  ]);
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

async function createProduct(product) {
  const productModel = await ProductModel.create(product);
  return productModel;
}

async function createInventory(inventory) {
  const inventoryModel = await InventoryModel.create(inventory);
  return inventoryModel;
}

async function createEvent(event) {
  const eventModel = await EventModel.create(event);
  return eventModel;
}

async function createSale(sale) {
  const saleModel = await SaleModel.create(sale);
  return saleModel;
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
  const promiseNine = SubgenreModel.deleteMany({});
  const promiseTen = ProductModel.deleteMany({});
  const promiseEleven = InventoryModel.deleteMany({});
  const promiseTwelve = SaleModel.deleteMany({});
  const promiseThirteen = EventModel.deleteMany({});
  await Promise.all([
    promiseOne,
    promiseTwo,
    promiseThree,
    promiseFour,
    promiseFive,
    promiseSix,
    promiseSeven,
    promiseEight,
    promiseNine,
    promiseTen,
    promiseEleven,
    promiseTwelve,
    promiseThirteen
  ]);
}

async function createSuggestion(reader, text) {
  const suggestion = {
    reader,
    text,
    sentDate: new Date(),
    suggestionStatus: "Pending",
    score: 10,
    readingChapters: 5
  };
  return await SuggestionModel.create(suggestion);
}

async function createSuggestionCompleted(reader, text) {
  const suggestion = {
    reader,
    text,
    sentDate: new Date(),
    suggestionStatus: "Completed",
    score: 10,
    readingChapters: 5
  };
  return await SuggestionModel.create(suggestion);
}

export async function createEverything() {
  const rolesExists = await RoleModel.find();
  ///if (rolesExists.length > 0) return;
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
    reportsRead: true,
    reportsCreate: true,
    reportsEdit: true,
    reportsDelete: true,
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
    pointOfSaleDelete: true,
    pointOfSaleEdit: true,
    advancePhase: true,
    eventRead: true,
    eventCreate: true,
    eventDelete: true,
    eventEdit: true,
    saleRead: true,
    saleCreate: true,
    saleEdit: true,
    saleDelete: true
  });
  console.log("Role 1 created successfully");
  const admin1 = await createAdmin(
    {
      name: "Admin 1",
      password: "prueba12345",
      email: "admin1@gmail.com",
      birthdate: "12/12/2000",
      phone: "8116690319",
      nationality: "México"
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
      nationality: "México"
    },
    superAdminRole._id
  );
  console.log("Admin 2 created successfully");
  const genres = await fillGenres();
  let subgenres = genres.map(genre => genre.subgenres[0]._id);
  console.log("Genres created successfully");
  const genreIds = subgenres.splice(0, 3).map((x) => x._id);
  const reader1 = await createReader({
    name: "Reader 1",
    password: "prueba12345",
    email: "reader1@gmail.com",
    birthdate: "12/12/2000",
    phone: "8116690319",
    nationality: "México",
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
    nationality: "México",
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
    nationality: "México",
    pseudonym: "writer1"
  });
  console.log("Writer 1 created successfully");
  const writer2 = await createWriter({
    name: "Writer 2",
    password: "prueba12345",
    email: "writer2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690319",
    nationality: "México",
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
    registerNumber: "12345asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120,
    numberOfChapters: 30
  });

  console.log("Text 2 created successfully");

  const text3 = await createText({
    writer: writer1._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text C",
    registerNumber: "1234asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120,
    numberOfChapters: 30,
    isRejected: true
  });

  console.log("Text 3 created successfully");

  const text4 = await createText({
    writer: writer2._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text D",
    registerNumber: "1234asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120,
    numberOfChapters: 30,
    isRejected: true
  });

  console.log("Text 4 created successfully");

  const text5 = await createText({
    writer: writer2._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text E",
    registerNumber: "1234asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 160,
    numberOfChapters: 40,
    isRejected: true
  });

  console.log("Text 5 created successfully");

  var inventory1 = await createInventory({
    writer: writer1._id,
    items: [
    ],
  });

  console.log("Inventory 1 created successfully");

  const product1 = await createProduct({
    name: "Sticker 1",
    description: "Sticker 1 for Book",
    price: 123,
    stock: 10,
    link: "https://semantic-ui.com/images/wireframe/image.png",
    category: "Merchandise",
  
    inventory: inventory1._id
  });

  console.log("Product 1 created successfully");

  const product2 = await createProduct({
    name: "Book 1",
    description: "Book 1",
    price: 123,
    stock: 10,
    link: "https://semantic-ui.com/images/wireframe/image.png",
    category: "Book",
  
    inventory: inventory1._id
  });

  console.log("Product 2 created successfully");

  inventory1.items.push(product1)
  inventory1.items.push(product2)
  inventory1.save()

  console.log("Inventory 1 updated successfully");

  var inventory2 = await createInventory({
    writer: writer2._id,
    items: [
    ],
  });

  console.log("Inventory 2 created successfully");

  const product3 = await createProduct({
    name: "Sticker 2",
    description: "Sticker 2 for Book",
    price: 123,
    stock: 10,
    link: "https://semantic-ui.com/images/wireframe/image.png",
    category: "Merchandise",
  
    inventory: inventory2._id
  });

  console.log("Product 3 created successfully");

  const product4 = await createProduct({
    name: "Book 2",
    description: "Book 2",
    price: 123,
    stock: 10,
    link: "https://semantic-ui.com/images/wireframe/image.png",
    category: "Book",
  
    inventory: inventory2._id
  });

  console.log("Product 4 created successfully");

  inventory2.items.push(product3)
  inventory2.items.push(product4)
  inventory2.save()

  console.log("Inventory 2 updated successfully");


  const event1 = await createEvent({
    name: "asd",
    description: "asd",
    place: "asd",
    date: "2021-04-28",
    time:"15:00"
  });
  
  console.log("Event 1 created successfully");

  const sale1 = await createSale({
    createdBy: admin1._id, 
    event: event1,
    items: [
      {
        productId: product1,
        name: "Sticker 1",
        price: 123,
        numberOfItems: 1,
        subtotal: 123
      },
      {
        productId: product2,
        name: "Book 1",
        price: 123,
        numberOfItems: 1,
        subtotal: 123
      },
      {
        productId: product3,
        name: "Sticker 2",
        price: 123,
        numberOfItems: 1,
        subtotal: 123
      }
    ],
    total: 369
  });

  console.log("Sale 1 created successfully");

  const sale2 = await createSale({
    createdBy: admin1._id, 
    event: event1,
    items: [
      {
        productId: product2,
        name: "Book 1",
        price: 123,
        numberOfItems: 3,
        subtotal: 123
      },
      {
        productId: product3,
        name: "Sticker 2",
        price: 123,
        numberOfItems: 5,
        subtotal: 123
      }
    ],
    total: 984
  });

  console.log("Sale 2 created successfully");

  await Promise.all([
    createSuggestion(reader1._id, text1._id),
    createSuggestion(reader1._id, text2._id),
    createSuggestion(reader1._id, text3._id),
    createSuggestion(reader1._id, text4._id),

    createSuggestionCompleted(reader1._id, text5._id)    
  ]);

  console.log("Suggestions created successfully");
}
