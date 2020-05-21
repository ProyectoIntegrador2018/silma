import { send } from "@/utils/errors";
import { TextModel } from "@/models/text.model";
import { assignReaders } from "@/controllers/suggestion.controller"
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
    if (text._id) {
      await assignReaders(text)
    }
    return text;
  });
};

export const uploadTextDocument = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const documentPath = `texts/${id}/uploads`;
    const text = await TextModel.updateOne({ _id: id }, { $set: { documentPath } });
    return text;
  });
};

export const retrieveTextDocument = (request, response) => {
  try {
    const { id } = request.params;
    response.sendFile(`public/uploads/texts/${id}.md`, { root: '.' });
  } catch (err) {
    response.status(404).send({ message: 'File does not exist' });
  }
};

export const rejectText = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const text = await TextModel.findById(id);
    console.log(text);
  });
};