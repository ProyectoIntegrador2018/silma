import { send } from "@/utils/errors";
import * as RoleLogic from "../logics/role.logic";

export function getById(req, res) {
  send(res, async () => {
    const { id } = req.params;
    const role = await RoleLogic.getById(id);
    return role;
  });
}

export function list(req, res) {
  send(res, async () => {
    const roles = await RoleLogic.list();
    return roles;
  });
}

export function create(req, res) {
  send(res, async (session) => {
    const role = req.body;
    const newRole = await RoleLogic.create(role, session);
    return newRole;
  });
}

export function update(req, res) {
  send(res, async (session) => {
    const role = req.body;
    const updatedRole = await RoleLogic.update(role, session);
    return updatedRole;
  });
}

export function deleteRole(req, res) {
  send(res, async (session) => {
    const { id } = req.params;
    const deletedRole = await RoleLogic.deleteRole(id, session);
    return deletedRole;
  });
}
