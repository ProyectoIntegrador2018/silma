import { ReaderModel } from "@/models/reader.model";
import { send } from "@/utils/errors";
import { createUser } from "@/controllers/user.controller"


export const getReaders = (request, response) => {
  send(response, async () => {
    const readers = await ReaderModel.find().populate("user");
    return readers;
  });
};

export const getReader = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const reader = await ReaderModel.findById(id).populate("user");
    return reader;
  });
};



export const createReader = (request, response) => {
  send(response, async () => {
    const UserNew = await createUser(request, response, "reader");
    const data = request.body;
    const lookUserReader = await ReaderModel.findOne({ user: UserNew._id });
    if (!lookUserReader) {
      const readerData = {
        ...data,
        user: UserNew._id
      }
      const newReader = await ReaderModel.create(readerData);
      newReader.user = UserNew;
      return newReader;
    } else {
      throw { error: "The e-mail already has a reader account" };
    }
  });
};
