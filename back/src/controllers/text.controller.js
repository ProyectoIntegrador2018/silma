import { send } from "@/utils/errors";
import { WriterModel } from "@/models/writer.model";
import { TextModel } from "@/models/text.model";
import { assignReaders } from "@/controllers/suggestion.controller";
import { sendEmail } from "@/utils/mailSender";
import { uploadDocument, getDocument } from "@/controllers/aws.controller";
import { UserModel } from '@/models/user.model';

// Response with all texts with their genres.
export const getAllTexts = (request, response) => {
  send(response, async () => {
    const readers = await TextModel.find().populate("genres");
    return readers;
  });
};

// Response with a particular text based on its id.
export const getText = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const reader = await TextModel.findById(id).populate("genres");
    return reader;
  });
};

// Response with all texts in a particul current phase.
export const getTextsInPhase = (request, response) => {
  send(response, async () => {
    const { phase } = request.params;
    const reader = await TextModel.find({ phase }).populate("genres");
    return reader;
  });
};

// Creates a text and sends an email to the writer.
export const createText = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const text = await TextModel.create(data);
    const user = await WriterModel.findById(text.writer).populate("user");
    var email = user.user.email
    if (text._id) {
      await assignReaders(text, 3);
      await sendEmail({
        subject: "Enviaste tu texto para que sea dictaminado.",
        email: email
      }, 'received', { title: text.title, name: user.user.name });
    }
    return text;
  });
};

// Uploads to aws the text document of a particular text.
export const uploadTextDocument = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const document = request.files.document;
    uploadDocument(id + ".md", document.data)
  });
};

// Response with the text document of a particular text.
export const retrieveTextDocument = (request, response) => {
  send(response, async () => {
    try {
      const { id } = request.params;
      var book = await getDocument(id)
      return { "message": book.Body.toString() }
    } catch (err) {
      response.status(404).send({ message: 'File does not exist' });
    }
  });
};

// Response with all the texts of a particular writer.
export const getTextsOfWriter = (request, response) => {
  send(response, async () => {
    const { writer } = request.params;
    const reader = await TextModel.find({ writer }).populate("genres");
    return reader;
  });
};

// Rejects a particular text and sends an email to the writer with a pdf file.
export const rejectText = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    await TextModel.updateOne({ _id: id }, { isRejected: true });
    const text = await TextModel.findById(id).populate("writer");
    const user = await UserModel.findById(text.writer.user);
    const document = request.files.document;
    // Email with pdf file
    await sendEmail({
      email: user.email,
      subject: "No se aprobó tu texto",
      attachments: [
        {
          filename: document.name,
          content: document.data
        }
      ]
    }, 'rejected', { title: text.title, name: user.name });
    return text;
  });
};