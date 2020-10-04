import { isNullOrUndefinedOrEmpty } from "../utils/utils";
import Messages from "../utils/messages";
import { SilmaError, handleSyncRequest } from "../utils/errors";
import RoleModel from "../models/role.model";

export function onSaveMiddleware(req, res, next) {
  handleSyncRequest(() => {
    const role = req.body;
    isFormComplete(role);
  }, next);
}

export async function onSaveValidation(role) {
  await allFieldsUnique(role);
}

function isFormComplete(role) {
  const requiredProperties = ["name"];
  if (requiredProperties.some((x) => isNullOrUndefinedOrEmpty(role[x]))) {
    throw new SilmaError(406, Messages.IncompleteForm());
  }
}

async function allFieldsUnique(role) {
  const { _id, name } = role;
  const roleModel = await RoleModel.findOne({ _id: { $ne: _id }, name });
  if (roleModel) throw new SilmaError(406, Messages.DuplicatedValue("Nombre"));
}

/**
 * @todo Function to validate that the Role is not assigned to any user
 */
