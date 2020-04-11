import { UserModel } from "@/models/user.model";
import { send } from "@/utils/errors";
const config = require('@/config.json');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


export const authUser = (request, response) => {
    send(response, async () => {
      var data = request.body
      console.log(data)
      const user = await UserModel.findOne({ email: data.email }).select(['+password']);
      if (user && bcrypt.compareSync(data.password, user.password)) {
          var userWithoutHash = await UserModel.findOne({ _id: user._id });
          const token = jwt.sign({ sub: user.id }, config.secret);
          return {
              ...userWithoutHash._doc,
              token
          };
      }else{
        return { status: "Authentication Failed" }
      }
    });
  };

  export const createUser = async (request, response) => {
    var data = request.body
    const lookUser = await UserModel.findOne({ email: data.email }).select(['+password']);
    if(lookUser){
      return lookUser
    }else{
      if(data.password.length < 8){
        return { status: "Password needs to be at least 8 characters long" }
      }
      data.password = bcrypt.hashSync(data.password, 10);
      var user = await UserModel.create(data);
      var UserNew = await UserModel.findOne({ _id: user._id })
      return UserNew
    }
  }