const expressJwt = require('express-jwt');
const config = require('@/config.json');
import { UserModel } from "@/models/user.model";
import { AdminModel } from "@/models/admin.model";


module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/register/readers',
            '/api/register/writers',
            '/api/admins/register',
            '/api/user/authentication'
        ]
    });
}

async function isRevoked(req, payload, done) {
    //console.log(req.url)
    const user = await UserModel.findById(payload.sub)
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};