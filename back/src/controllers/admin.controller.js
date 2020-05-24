import { AdminModel } from "@/models/admin.model";
import { GenreModel } from "@/models/genre.model";
import { FeedbackModel } from "@/models/feedback.model";
import { TextModel } from "@/models/text.model";
import { UserModel } from "@/models/user.model";
import { createUser } from "@/controllers/user.controller"; 
import { send } from "@/utils/errors";
import { movePhaseEmail } from "@/utils/emails";
import { sendEmail } from "@/utils/mailSender";

export const genres = [
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

export const getAdmins = (request, response) => {
  send(response, async () => {
    const admins = await AdminModel.find().populate("user");
    return admins;
  });
};

export const getAdmin = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const admin = await AdminModel.findById(id).populate("user");
    return admin;
  });
};

export const createAdmin = (request, response) => {
  send(response, async () => {
    const newUser = await createUser(request, response, "admin");
    const data = request.body;
    const lookUserAdmin = await AdminModel.findOne({ user: newUser._id });
    if (!lookUserAdmin) {
      const adminData = {
        ...data,
        user: newUser._id
      }
      const newAdmin = await AdminModel.create(adminData);
      newAdmin.user = newUser;
      return newAdmin;
    } else {
      throw { error: "The e-mail already has a admin account" };
    }
  });
};

export const createGenre = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const genre = await GenreModel.create(data);
    return genre;
  });
};

export const fillGenres = (request, response) => {
  send(response, async () => {
    await GenreModel.deleteMany({});
    for (const genre of genres) {
      const obj = { name: genre }
      await GenreModel.create(obj);
    }
    return await GenreModel.find({});
  })
}

export const getFeedback = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const feedback = await FeedbackModel.findById(id);
    return feedback;
  });
};

export const movePhase = (request, response) => {
  send(response, async() =>{
      const { id } = request.params;
      const text = await TextModel.findById(id);
      const newPhase = request.body;
      const phase = await TextModel.updateOne(
          {_id: id},
          {$set: {phase: newPhase.newPhase}},
          function(err, res) {
            if (err) throw err;
            console.log("Phase advanced");
          }
      )
      const writer = await UserModel.findById(text.writer);
      var email = movePhaseEmail[newPhase.newPhase - 2];
      email.email = writer.email
      email.subject = "Tu texto avanzo a Fase " + newPhase
      await sendEmail(email);
  });
};