import { WriterModel } from "@/models/writer.model";
import { send } from "@/utils/errors";
import { createUser } from "@/controllers/user.controller"

const config = require('@/config.json');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


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
    var UserNew = await createUser(request,response)
    var data = request.body
    const lookUserWriter = await WriterModel.findOne({ user: UserNew._id });
    if(!lookUserWriter){
        var writerData = {
          user: UserNew._id, 
          pseudonym: data.pseudonym,
          phase: data.phase,
          isPlus: data.isPlus
        }
        var writerData = await WriterModel.create(writerData);
        writerData.user = UserNew
        return writerData;
    }else{
      return ({ status: "The e-mail already has a writer account" })
    }
  });
};
