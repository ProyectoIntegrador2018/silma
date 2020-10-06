import expressJwt from "express-jwt";
import { UserModel } from "@/models/user.model";
import config from "../config/config";

export function verifyToken(authorizedRoles = undefined) {
  if (!authorizedRoles) authorizedRoles = ["admin", "writer", "reader"];
  const secret = config.SECRET_JWT;
  return expressJwt({
    secret,
    isRevoked: (req, payload, done) =>
      isRevoked(req, payload, done, authorizedRoles)
  });
}

async function isRevoked(req, payload, done, authorizedRoles) {
  const user = await UserModel.findById(payload.sub);
  if (user) {
    const isAuthorized = authorizedRoles.some((authRole) =>
      user.roles.includes(authRole)
    );
    if (isAuthorized) {
      return done();
    }
  }
  // revoke token if user no longer exists
  return done(null, true);
}
