import { send } from "@/utils/errors";
import { TextModel } from "@/models/text.model";

export const getAllTexts = (request, response) => {
  send(response, async () => {
    const readers = await TextModel.find().populate("genre");
    return readers;
  });
};

export const getText = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const reader = await TextModel.findById(id).populate("genre");
    return reader;
  });
};

export const getTextsInPhase = (request, response) => {
  send(response, async () => {
    const { phase } = request.params;
    const reader = await TextModel.find({ phase }).populate("genre");
    return reader;
  });
};

export const createText = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const text = await TextModel.create(data);
    return text;
  });
};
