import { AdminModel } from "@/models/admin.model";
import { send } from "@/utils/errors";

export const getAdmins = (request, response) => {
  send(response, async () => {
    const admins = await AdminModel.find();
    return admins;
  });
};

export const getAdmin = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const admin = await AdminModel.findById(id);
    return admin;
  });
};

export const createAdmin = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const admin = await AdminModel.create(data);
    return admin;
  });
};
