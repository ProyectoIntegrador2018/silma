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
  const newRoleDoc = await newRole.save();
  return newRoleDoc;
}

export async function update(role, session) {
  const oldRole = await RoleModel.findById(role._id);
  const updatedRole = Object.assign(oldRole, role);
  await updatedRole.save();
  return updatedRole;
}

export async function deleteRole(id, session) {
  const roleToDelete = await RoleModel.findOne({ _id: id });
  await roleToDelete.remove();
  return roleToDelete;
}
