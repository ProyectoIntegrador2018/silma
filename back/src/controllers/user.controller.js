import { UserModel } from "@/models/user.model";
import { GenreModel } from "@/models/genre.model";
import { send } from "@/utils/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { getUserTypes } from "../logics/user.logic";

// Authenticates a user with correct email and password.
// Response with a user with the token.
export const authUser = (request, response) => {
  send(response, async () => {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email }).select(["+password"]);
    // Checks if user with email exists and the password is correct.
    if (user && bcrypt.compareSync(password, user.password)) {
      // Returns user info with token and user type.
      const userWithoutHash = await UserModel.findOne({ _id: user._id });
      const [admin, writer, reader] = await getUserTypes(userWithoutHash._id);

      const token = jwt.sign({ sub: user.id }, config.SECRET_JWT);
      return {
        ...userWithoutHash._doc,
        admin,
        writer,
        reader,
        token
      };
    } else {
      return { status: "Authentication Failed" };
    }
  });
};

// Response with info of a particular user
export const getUser = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const userModel = await UserModel.findById(id);
    const [admin, writer, reader] = await getUserTypes(userModel._id);
    const user = { ...userModel.toJSON(), admin, writer, reader };
    return user;
  });
};

// Response with info of every user
export const getUsers = (req, res) => {
  send(res, async() => {
    const users = await UserModel.find();
    return users
  });
}

// Creates a new user with an assigned role.
export const createUser = async (request, response, role) => {
  let data = request.body;
  let user = await UserModel.findOne({ email: data.email }).select([
    "+password"
  ]);
  if (!user) {
    if (data.password.length < 8) {
      return { status: "Password needs to be at least 8 characters long" };
    }
    // Assigns a role to the user.
    data.roles = [role];
    data.password = bcrypt.hashSync(data.password, 10);
    user = await UserModel.create(data);
    const foundUser = await UserModel.findOne({ _id: user._id });
    return foundUser;
  }
  // Send error when user is already registered.
  throw { error: "User already registered" };
};

// Response with all the genres.
export const getAllGenres = (request, response) => {
  send(response, async () => {
    const genres = await GenreModel.find();
    return genres;
  });
};
