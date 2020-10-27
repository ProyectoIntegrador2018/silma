import { isNullOrUndefinedOrEmpty } from "../utils/utils";
import Messages from "../utils/messages";
import { SilmaError, handleSyncRequest } from "../utils/errors";
import RoleModel from "../models/role.model";
import { AdminModel } from "../models/admin.model";

export function onSaveMiddleware(req, res, next) {
  handleSyncRequest(() => {
    const role = req.body;
    isFormComplete(role);
  }, next);
}

export async function onSaveValidation(role) {
  await allFieldsUnique(role);
}

export async function onDeleteValidation(role) {
  await isAssignedToAdmin(role);
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

async function isAssignedToAdmin(role) {
  const admin = await AdminModel.findOne({ role: role._id });
  if (admin) throw new SilmaError(400, Messages.RoleAssignedToAdmin());
}
