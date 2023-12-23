import { MongooseModel } from "@tsed/mongoose";
import { User } from "../models/User";

/*
 * To check if user exists in data base or not
 * Not being utilized in project / ****Another implementation at service layer***
 */

export const userExists = async (_address: string) => {
  let user: MongooseModel<User>;

  const fecthedUser = await user.findOne({ address: _address });

  if (fecthedUser == null) {
    return false;
  } else {
    return true;
  }
};
