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
  const { _id, name, code } = role;
  const roleModel = await RoleModel.findOne({
    _id: { $ne: _id },
    $or: [{ code }, { name }]
  });
  if (roleModel) {
    const repeatedField = roleModel.code === code ? "Código" : "Nombre";
    throw new SilmaError(406, Messages.DuplicatedValue(repeatedField));
  }
}

/**
 * @todo Function to validate that the Role is not assigned to any user
 */
