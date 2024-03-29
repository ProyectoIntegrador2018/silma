import { AdminModel } from "@/models/admin.model";
import { FeedbackModel } from "@/models/feedback.model";
import { TextModel } from "@/models/text.model";
import { WriterModel } from "@/models/writer.model";
import { UserModel } from "@/models/user.model";
import { createUser } from "@/controllers/user.controller";
import { send } from "@/utils/errors";
import { sendEmail } from "@/utils/mailSender";
import { phases } from "@/utils/emails";

//Generos base de Silma
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

//Funcion que regresa todo los usuarios de tipo administrador
export const getAdmins = (request, response) => {
  send(response, async () => {
    const admins = await AdminModel.find().populate("user");
    return admins;
  });
};

//Funcion que regresa el administrador que coincide con el id recibido
export const getAdmin = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const admin = await AdminModel.findById(id).populate("user");
    return admin;
  });
};

//Funcion que crea un administrador
export const createAdmin = (request, response) => {
  send(response, async () => {
    const newUser = await createUser(request, response, "admin");
    const data = request.body;
    //Autenticar que no existe ya alguien registrado con el correo
    const lookUserAdmin = await AdminModel.findOne({ user: newUser._id });
    if (!lookUserAdmin) {
      const adminData = {
        ...data,
        _id: newUser._id,
        user: newUser._id
      };
      const newAdmin = await AdminModel.create(adminData);
      newAdmin.user = newUser;
      return newAdmin;
    } else {
      throw { error: "The e-mail already has a admin account" };
    }
  });
};

//Funcion que regresa la retroalimentacion de un lector de un texto
export const getFeedback = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const feedback = await FeedbackModel.findById(id);
    return feedback;
  });
};

const phaseDateUtil = (datesPerPhase, newPhase, oldPhase) =>{
  if(oldPhase < newPhase){
    for(let i=oldPhase+1; i<=newPhase; i++){
      datesPerPhase[i] = new Date();
    }
  }
  else{
    for(let i=oldPhase; i>newPhase; i--){
      datesPerPhase[i] = null;
    }
  }
  return datesPerPhase;
}
//Funcion que avanza la fase del texto del cual recibe su ID
export const movePhase = (request, response) => {
  send(response, async () => {
    const { id } = request.params;

    const text = await TextModel.findById(id);
    const newPhase = request.body.phase;
    const phase = await TextModel.updateOne(
      { _id: id },
      { $set: { phase: newPhase, datesPerPhase: phaseDateUtil(text.datesPerPhase, newPhase, text.phase)}},
      function (err, res) {
        if (err) throw err;
      }
    );

    const phaseInfo = phases[newPhase];
    const writer = await WriterModel.findById(text.writer);
    const user = await UserModel.findById(writer.user);
    // Enviar correo al autor del avance de su texto
    if (newPhase === 2) {
      // La fase es la de aceptacion
      await sendEmail(
        {
          email: user.email,
          subject: "¡Tu novela fue aprobada!"
        },
        "accepted",
        {
          name: user.name,
          title: text.title
        }
      );
    } else {
      await sendEmail(
        {
          email: user.email,
          subject: "Tu novela avanzó de Fase"
        },
        "next_phase",
        {
          name: user.name,
          title: text.title,
          phase: newPhase + "-" + phaseInfo.name,
          description: phaseInfo.description
        }
      );
    }
  });
};

//Funcion que obtiene la retroalimentacion ligada a la sugerencia recibida por su id
export const getFeedbackIdBySuggestion = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const feedback = await FeedbackModel.find({ suggestion: id });
    return feedback[0]._id;
  });
};

export const setRole = (req, res) => {
  send(res, async () => {
    const newRole = await AdminModel.findByIdAndUpdate(
      req.params.id,
      { $set: { role: req.params.role } },
      { useFindAndModify: false },
      (err, res) => {
        if (err) throw err;
      }
    );
    return newRole;
  });
};

// Funcion para hacer administrador a un usuario registrado
export const makeAdmin = (req, res) => {
  send(res, async () => {
    const user = req.body;
    //Autenticar que no existe ya alguien registrado con el correo
    const lookUserAdmin = await AdminModel.findOne({ user: user._id });
    if (!lookUserAdmin) {
      const newAdmin = await AdminModel.create(user);
      // Agregar al campo de roles
      await UserModel.updateOne(
        { _id: user.user },
        { $addToSet: { roles: "admin" } }
      );
      return newAdmin;
    } else {
      throw { error: "The e-mail already has a admin account" };
    }
  });
};

// Funcion para remover permisos de administrador
export const removeAdmin = (req, res) => {
  send(res, async () => {
    const user_id = req.params.id;
    await AdminModel.findOne({ user: user_id }).deleteOne().exec();
    await UserModel.update(
      { _id: user_id },
      { $pullAll: { roles: ["admin"] } }
    );
  });
};
