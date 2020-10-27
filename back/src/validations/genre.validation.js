import { isNullOrUndefinedOrEmpty } from "../utils/utils";
import Messages from "../utils/messages";
import { SilmaError, handleSyncRequest } from "../utils/errors";
import { FeedbackModel } from "../models/feedback.model";
import { ReaderModel } from "../models/reader.model";
import { TextModel } from "../models/text.model";

export function onSaveMiddleware(req, res, next) {
  handleSyncRequest(() => {
    const genre = req.body;
    isFormComplete(genre);
  }, next);
}

export async function onDeleteValidations(genre) {
  await isRelatedToSomething(genre);
}

function isFormComplete(genre) {
  const genreRequiredFields = ["name"];
  const subgenreRequiredFields = ["name"];
  const { subgenres } = genre;
  if (
    genreRequiredFields.some((x) => isNullOrUndefinedOrEmpty(genre[x])) ||
    subgenreRequiredFields.some((field) =>
      subgenres.some((subgenre) => isNullOrUndefinedOrEmpty(subgenre[field]))
    )
  )
    throw new SilmaError(406, Messages.IncompleteForm());
}

async function isRelatedToSomething(genre) {
  const feedbackPromise = FeedbackModel.findOne({ selectedGenres: genre._id });
  const readerPromise = ReaderModel.findOne({ preferences: genre._id });
  const textPromise = TextModel.findOne({ genres: genre._id });
  const [feedback, reader, text] = await Promise.all([
    feedbackPromise,
    readerPromise,
    textPromise
  ]);

  if (feedback)
    throw new SilmaError(
      405,
      "No se puede eliminar el género porque esta relacionado a alguna reseña."
    );
  if (reader)
    throw new SilmaError(
      405,
      "No se puede eliminar el género porque esta relacionado a algún lector."
    );
  if (text)
    throw new SilmaError(
      405,
      "No se puede eliminar el género porque esta relacionado a algún texto."
    );
}
