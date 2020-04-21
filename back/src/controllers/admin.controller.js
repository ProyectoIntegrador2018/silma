import { AdminModel } from "@/models/admin.model";
import { send } from "@/utils/errors";

export const getAdmins = (request, response) => {
  send(response, async () => {
    const admins = await AdminModel.find().populate("user");
    return admins;
  });
};

export const getAdmin = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const admin = await AdminModel.findById(id).populate("user");
    return admin;
  });
};

export const createAdmin = (request, response) => {
  send(response, async () => {
    const newUser = await createUser(request, response, "admin");
    const data = request.body;
    const lookUserAdmin = await AdminModel.findOne({ user: UserNew._id });
    if (!lookUserAdmin) {
      const adminData = {
        ...data,
        user: newUser._id
      }
      const newAdmin = await AdminModel.create(adminData);
      newAdmin.user = newUser;
      return newAdmin;
    } else {
      throw { error: "The e-mail already has a admin account" };
    }
  });
};

