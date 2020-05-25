import { send } from "@/utils/errors";
import { WriterModel } from "@/models/writer.model";
import { TextModel } from "@/models/text.model";
import { assignReaders } from "@/controllers/suggestion.controller";
import { sendEmail } from "@/utils/mailSender";
import { uploadDocument, getDocument } from "@/controllers/aws.controller";
import { UserModel } from '@/models/user.model';
import { rejectTextEmail, bookReceivedEmail } from '@/utils/emails'; 

export const getAllTexts = (request, response) => {
  send(response, async () => {
    const readers = await TextModel.find().populate("genres");
    return readers;
  });
};

export const getText = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const reader = await TextModel.findById(id).populate("genres");
    return reader;
  });
};

export const getTextsInPhase = (request, response) => {
  send(response, async () => {
    const { phase } = request.params;
    const reader = await TextModel.find({ phase }).populate("genres");
    return reader;
  });
};

export const createText = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const text = await TextModel.create(data);
    const user = await WriterModel.findById(text.writer).populate("user");
    var email = user.user.email
    if (text._id) {
      await assignReaders(text, 3);
      const emailData = bookReceivedEmail(text);
      await sendEmail({
        ...emailData,
        email: email
      });
    }
    return text;
  });
};

export const uploadTextDocument = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const document = request.files.document;
    uploadDocument(id + ".md",document.data)
  });
};

export const retrieveTextDocument = (request, response) => {
  send(response, async () => {
    try {
      const { id } = request.params;
      var book = await getDocument(id)
      return { "message": book.Body.toString()}
    } catch (err) {
      response.status(404).send({ message: 'File does not exist' });
    }
  });
};

export const getTextsOfWriter = (request, response) => {
  send(response, async () => {
    const { writer } = request.params;
    const reader = await TextModel.find({ writer }).populate("genres");
    return reader;
  });
};

export const rejectText = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    await TextModel.updateOne({ _id: id }, { isRejected: true });
    const text = await TextModel.findById(id).populate("writer");
    const user = await UserModel.findById(text.writer.user);
    const document = request.files.document;
    const emailData = rejectTextEmail(user, text);
    await sendEmail({
      ...emailData,
      email: user.email,
      attachments: [
        {
          filename: document.name,
          content: document.data
        }
      ]
    });
    return text;
  });
};