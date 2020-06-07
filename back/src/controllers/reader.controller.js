import { ReaderModel } from "@/models/reader.model";
import { UserModel } from "@/models/user.model";

import { FeedbackModel } from "@/models/feedback.model";
import { send } from "@/utils/errors";
import { createUser } from "@/controllers/user.controller"
import jwt from "jsonwebtoken";


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
        _id: UserNew._id,
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

export const addReaderRegister = (request,response) => {
  send(response, async () => {
    const data = request.body;
    try{
      const readerData = {
        ...data,
        _id: data.userid,
        user: data.userid
      }
      const newReader = await ReaderModel.create(readerData);
      await UserModel.updateOne(
        { _id: data.userid },
        { $addToSet: { roles: "reader" } }
      );
       return {
        reader: newReader
      };
    }catch{
      throw { error: "Register Error" };
    }
  });

}

export const createFeedback = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const feedback = await FeedbackModel.create(data);
    return feedback;
  });
};