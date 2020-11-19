import { isNullOrUndefinedOrEmpty } from "../utils/utils";
import Messages from "../utils/messages";
import { SilmaError, handleSyncRequest } from "../utils/errors";
import { FeedbackModel } from "../models/feedback.model";
import { ReaderModel } from "../models/reader.model";
import { TextModel } from "../models/text.model";

export function onSaveMiddleware(req, res, next) {
  handleSyncRequest(() => {
    const event = req.body;
    isFormComplete(event);
  }, next);
}

export async function onDeleteValidations(event) {
  await isRelatedToSomething(event);
}

function isFormComplete(event) {
  const eventRequiredFields = ["name","time","date"];
  if (
    eventRequiredFields.some((x) => isNullOrUndefinedOrEmpty(event[x]))
  )
    throw new SilmaError(406, Messages.IncompleteForm());
}

async function isRelatedToSomething(event) {
  const feedbackPromise = FeedbackModel.findOne({ event: event._id });
  const readerPromise = ReaderModel.findOne({ preferences: event._id });
  const textPromise = TextModel.findOne({ event: event._id });
  const [feedback, reader, text] = await Promise.all([
    feedbackPromise,
    readerPromise,
    textPromise
  ]);

  if (feedback)
    throw new SilmaError(
      405,
      "No se puede eliminar el evento porque esta relacionado a alguna reseña."
    );
  if (reader)
    throw new SilmaError(
      405,
      "No se puede eliminar el evento porque esta relacionado a algún lector."
    );
  if (text)
    throw new SilmaError(
      405,
      "No se puede eliminar el evento porque esta relacionado a algún texto."
    );
}
