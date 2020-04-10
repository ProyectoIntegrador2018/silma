import { ReaderModel } from "@/models/reader.model";
import { send } from "@/utils/errors";

export const getReaders = (request, response) => {
  send(response, async () => {
    const readers = await ReaderModel.find();
    return readers;
  });
};

export const getReader = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const reader = await ReaderModel.findById(id);
    return reader;
  });
};

export const createReader = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const reader = await ReaderModel.create(data);
    return reader;
  });
};
