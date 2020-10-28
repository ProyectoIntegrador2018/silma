import { isNullOrUndefinedOrEmpty } from "../utils/utils";
import Messages from "../utils/messages";

export function onSaveValidations(subgenre) {
  isFormComplete(subgenre);
}

function isFormComplete(subgenre) {
  const subgenreRequiredFields = ["name"];
  if (subgenreRequiredFields.some((x) => isNullOrUndefinedOrEmpty(subgenre[x])))
    throw new SilmaError(406, Messages.IncompleteForm());
}
