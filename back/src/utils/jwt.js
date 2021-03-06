import expressJwt from "express-jwt";
import { UserModel } from "@/models/user.model";
import { AdminModel } from "../models/admin.model";
import { WriterModel } from "../models/writer.model";
import { ReaderModel } from "../models/reader.model";
import config from "../config/config";
import { SilmaError } from "./errors";
import Messages from "./messages";

/**
 *
 * @param {['admin', 'reader', 'writer']} authorizedUserTypes User types of the current user
 * @param {string} permission Permission required
 */
export function verifyToken(authorizedUserTypes, permission = null) {
  // If array is empty, any role can access that endpoint
  authorizedUserTypes = authorizedUserTypes || ["admin", "reader", "writer"];
  const secret = config.SECRET_JWT;
  return expressJwt({
    secret,
    isRevoked: (req, payload, done) =>
      isRevoked(req, payload, done, authorizedUserTypes, permission)
  });
}

async function isRevoked(req, payload, done, authorizedUserTypes, permission) {
  const user = await UserModel.findById(payload.sub);
  if (!user) return done(error, true);
  const adminPromise = AdminModel.findOne({ user: user._id }).populate("role");
  const writerPromise = WriterModel.findOne({ user: user._id }).populate(
    "role"
  );
  const readerPromise = ReaderModel.findOne({ user: user._id }).populate(
    "role"
  );

  const roles = await Promise.all([adminPromise, writerPromise, readerPromise]);

  if (user) {
    const isAuthorized = hasPermission(authorizedUserTypes, roles, permission);
    if (isAuthorized) {
      return done();
    }
  }
  // Revoke token if user no longer exists or doesn't have access to the route
  const error = new SilmaError(401, Messages.Unauthorized());
  return done(error, true);
}

/**
 *
 * @param {string[]} authorizedUserTypes
 * @param {[any, any, any]} userTypes
 * @param {string} permission
 */
function hasPermission(authorizedUserTypes, userTypes, permission) {
  const [admin, writer, reader] = userTypes;
  const adminAccess =
    admin &&
    authorizedUserTypes.some((x) => x === "admin") &&
    (permission === null || (admin.role && admin.role[permission]));
  const writerAccess =
    writer && authorizedUserTypes.some((x) => x === "writer");
  const readerAccess =
    reader && authorizedUserTypes.some((x) => x === "reader");
  return adminAccess || writerAccess || readerAccess;
}
