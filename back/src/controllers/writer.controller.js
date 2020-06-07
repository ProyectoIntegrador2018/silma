import { WriterModel } from "@/models/writer.model";
import { send } from "@/utils/errors";
import { createUser } from "@/controllers/user.controller";
import { UserModel } from "@/models/user.model";

export const getWriters = (request, response) => {
  send(response, async () => {
    const writers = await WriterModel.find().populate("user");
    return writers;
  });
};

export const getWriter = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const writer = await WriterModel.findById(id).populate("user");
    return writer;
  });
};

export const createWriter = (request, response) => {
  send(response, async () => {
    const UserNew = await createUser(request, response, "writer");
    const data = request.body;
    const lookUserWriter = await WriterModel.findOne({ user: UserNew._id });
    if (!lookUserWriter) {
      const writerData = {
        ...data,
        _id: UserNew._id,
        user: UserNew._id
      }
      const newWriter = await WriterModel.create(writerData);
      newWriter.user = UserNew;
      return newWriter;
    } else {
      throw { error: "The e-mail already has a writer account" };
    }
  });
};

export const addWriterRegister = (request, response) => {
  send(response, async () => {
    const data = request.body;
    try{
      const writerData = {
        ...data,
        _id: data.userid,
        user: data.userid
      }
      const newWriter = await WriterModel.create(writerData);
      await UserModel.updateOne(
        { _id: data.userid },
        { $addToSet: { roles: "writer" } }
      );
      return {
        writer: newWriter
      };
    }catch{
      throw { error: "Register Error" };
    }
  });
}
