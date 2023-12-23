import { MongooseModel } from "@tsed/mongoose";
import { User } from "../models/User";

export const userExists = async (_address: string) => {
  let user: MongooseModel<User>;

  const fecthedUser = await user.findOne({ address: _address }, { _id: 0 });

  if (fecthedUser == null) {
    return false;
  } else {
    return true;
  }
};
