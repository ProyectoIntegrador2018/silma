import expressJwt from "express-jwt";
import config from "@/config.json";
import { UserModel } from "@/models/user.model";


module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/register/readers',
      '/api/register/writers',
      '/api/admins/register',
      '/api/user/authentication',
      '/api/user/genres',
      '/api/admins/fillGenres'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await UserModel.findById(payload.sub);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
};