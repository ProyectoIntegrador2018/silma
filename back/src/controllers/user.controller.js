import { UserModel } from "@/models/user.model";
import { GenreModel } from "@/models/genre.model";
import { send } from "@/utils/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authUser = (request, response) => {
  send(response, async () => {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email }).select(['+password']);
    if (user && bcrypt.compareSync(password, user.password)) {
      const userWithoutHash = await UserModel.findOne({ _id: user._id });
      const token = jwt.sign({ sub: user.id }, process.env.SECRET_JWT);
      return {
        ...userWithoutHash._doc,
        token
      };
    } else {
      return { status: "Authentication Failed" };
    }
  });
};

export const getUser = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    return await UserModel.findById(id);
  });
};

export const createUser = async (request, response, role) => {
  let data = request.body;
  let user = await UserModel.findOne({ email: data.email }).select(['+password']);
  if (!user) {
    if (data.password.length < 8) {
      return { status: "Password needs to be at least 8 characters long" };
    }
    data.roles = [role];
    data.password = bcrypt.hashSync(data.password, 10);
    user = await UserModel.create(data);
    const foundUser = await UserModel.findOne({ _id: user._id });
    return foundUser;
  }
  throw { error: "User already registered" }; 
};

export const getAllGenres = (request, response) => {
  send(response, async () => {
    const genres = await GenreModel.find();
    return genres;
  });
};
