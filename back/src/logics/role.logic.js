import RoleModel from "../models/role.model";

export async function getById(id) {
  const role = await RoleModel.findById(id);
  return role;
}

export async function list() {
  const roles = await RoleModel.find();
  return roles;
}

export async function create(role, session) {
  const newRole = new RoleModel(role);
  const newRoleDoc = await newRole.save({ session });
  return newRoleDoc;
}

export async function update(role, session) {
  const oldRole = await RoleModel.findById(role._id);
  const updatedRole = Object.assign(oldRole, role);
  await updatedRole.save({ session });
  return updatedRole;
}

export async function deleteRole(id, session) {
  const deletedRole = await RoleModel.deleteOne({ _id: id }, { session });
  return deletedRole;
}
