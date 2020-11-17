import { isNullOrUndefinedOrEmpty } from "../utils/utils";
import Messages from "../utils/messages";
import { SilmaError, handleSyncRequest } from "../utils/errors";
import { FeedbackModel } from "../models/feedback.model";
import { ReaderModel } from "../models/reader.model";
import { TextModel } from "../models/text.model";

export function onSaveMiddleware(req, res, next) {
  handleSyncRequest(() => {
    const pointOfSale = req.body;
    isFormComplete(pointOfSale);
  }, next);
}

export async function onDeleteValidations(pointOfSale) {
  await isRelatedToSomething(pointOfSale);
}

function isFormComplete(pointOfSale) {
  const pointOfSaleRequiredFields = ["name"];
  if (
    pointOfSaleRequiredFields.some((x) => isNullOrUndefinedOrEmpty(pointOfSale[x]))
  )
    throw new SilmaError(406, Messages.IncompleteForm());
}

async function isRelatedToSomething(pointOfSale) {
  const feedbackPromise = FeedbackModel.findOne({ selectedGenres: pointOfSale._id });
  const readerPromise = ReaderModel.findOne({ preferences: pointOfSale._id });
  const textPromise = TextModel.findOne({ pointOfSale: pointOfSale._id });
  const [feedback, reader, text] = await Promise.all([
    feedbackPromise,
    readerPromise,
    textPromise
  ]);

  if (feedback)
    throw new SilmaError(
      405,
      "No se puede eliminar el punto de venta porque esta relacionado a alguna reseña."
    );
  if (reader)
    throw new SilmaError(
      405,
      "No se puede eliminar el punto de venta porque esta relacionado a algún lector."
    );
  if (text)
    throw new SilmaError(
      405,
      "No se puede eliminar el punto de venta porque esta relacionado a algún texto."
    );
}
