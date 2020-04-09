import { WriterModel } from "@/models/writer.model";
import { send } from "@/utils/errors";

export const getWriters = (request, response) => {
  send(response, async () => {
    const writers = await WriterModel.find();
    return writers;
  });
};

export const getWriter = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const writer = await WriterModel.findById(id);
    return writer;
  });
};

export const createWriter = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const writer = await WriterModel.create(data);
    return writer;
  });
};
