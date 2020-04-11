import { ReaderModel } from "@/models/reader.model";
import { send } from "@/utils/errors";
import { createUser } from "@/controllers/user.controller"

const bcrypt = require('bcrypt')


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
    var UserNew = await createUser(request,response)
    var data = request.body
    const lookUserReader = await ReaderModel.findOne({ user: UserNew._id });
    if(!lookUserReader){
        var readerData = {
          user: UserNew._id, 
          facebookLink: data.facebookLink,
          readingProficiency: data.readingProficiency,
        }
        var readerData = await ReaderModel.create(readerData);
        readerData.user = UserNew
        return readerData;
    }else{
      return ({ status: "The e-mail already has a reader account" })
    }
  });
};
