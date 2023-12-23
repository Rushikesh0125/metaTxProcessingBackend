import { Err, Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../models/User";

/*
 *@service
 *User service
 *
 *It injects mongoose model in this case a User model
 *
 *this class interacts with this model to save, delete, retrive the User
 *as per controller's request or invokation in other services
 *
 */

@Service()
export class UserService {
  @Inject(User)
  private User: MongooseModel<User>;

  async createUser(user: User): Promise<User> {
    try {
      const newUser = new this.User(user);

      return await newUser.save();
    } catch (error) {
      console.error("Failed to save User", error.message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.User.find();
    } catch (error) {
      console.log("Failed to get all users", error.message);
      throw new Error("Failed to get all users");
    }
  }

  async getUserByaddress(_address: string): Promise<User> {
    try {
      return await this.User.findOne({ address: _address }).exec();
    } catch (error) {
      console.log("Failed to get user", error.message);
      throw new Error("Failed to get user");
    }
  }
}
