import server from "@/server";
import { UserModel } from "@/models/user.model";
import { AdminModel } from "@/models/admin.model";
import { TextModel } from "@/models/text.model";
import { WriterModel } from "@/models/writer.model";
import { ReaderModel } from "@/models/reader.model";
import { SuggestionModel } from "@/models/suggestion.model";
import { GenreModel } from "@/models/genre.model";
import axios from "axios";

const deleteEverything = async () => {
  await UserModel.deleteMany({});
  await AdminModel.deleteMany({});
  await WriterModel.deleteMany({});
  await ReaderModel.deleteMany({});
  await TextModel.deleteMany({});
  await SuggestionModel.deleteMany({});
  await GenreModel.deleteMany({});
};


const runAll = async () => {
  await deleteEverything();
  const genres = await axios.post("http://localhost:3000/api/admins/fillGenres");
  const genreIds = genres.data.splice(0, 3).map(x => x._id);
  const admin1 = await axios.post("http://localhost:3000/api/admins/register", {
    name: "Admin 1",
    password: "prueba12345",
    email: "admin1@gmail.com",
    birthdate: "12/12/2012",
    phone: "8116690319",
    nationality: "Mexico",
    isSuperAdmin: true
  });
  const admin2 = await axios.post("http://localhost:3000/api/admins/register", {
    name: "Admin 2",
    password: "prueba12345",
    email: "admin2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690318",
    nationality: "Mexico"
  });
  const reader1 = await axios.post("http://localhost:3000/api/register/readers", {
    name: "Admin 1",
    password: "prueba12345",
    email: "admin1@gmail.com",
    birthdate: "12/12/2012",
    phone: "8116690319",
    nationality: "Mexico",
    readingProficiency: "4 to 6",
    facebookLink: "https://www.facebook.com/reader1",
    readFrom: "12-01-2019",
    readTill: "12-01-2020",
    preferences: genreIds
  });
  const reader2 = await axios.post("http://localhost:3000/api/register/readers", {
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
  const writer1 = await axios.post("http://localhost:3000/api/register/writers", {
    name: "Writer 1",
    password: "prueba12345",
    email: "writer1@gmail.com",
    birthdate: "12/12/2012",
    phone: "8116690319",
    nationality: "Mexico",
    pseudonym: "writer1"
  });
  const writer2 = await axios.post("http://localhost:3000/api/register/writers", {
    name: "Writer 2",
    password: "prueba12345",
    email: "writer2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690319",
    nationality: "Mexico",
    pseudonym: "writer2"
  });
  const auth = await axios.post("http://localhost:3000/api/user/authentication", {
    email: "admin1@gmail.com",
    password: "prueba12345"
  });
  const { token } = auth.data;
  const text1 = await axios.post("http://localhost:3000/api/texts", {
    writer: writer1.data._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text A",
    registerNumber: "123asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120
  }, { headers: { "Authorization": 'Bearer ' + token } });
  const text2 = await axios.post("http://localhost:3000/api/texts", {
    writer: writer1.data._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text B",
    registerNumber: "123asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120
  }, { headers: { "Authorization": 'Bearer ' + token } });
};

try {
  runAll();
} catch (error) {
  console.error(error);
}