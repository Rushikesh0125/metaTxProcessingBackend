import { Property, Required } from "@tsed/common";
import { Model, ObjectID } from "@tsed/mongoose";

/*
 * @Model
 * Defines attribute address that a user should posses
 * with a constructor to init an object
 */
@Model()
export class User {
  @Required()
  address: string;

  constructor(_address: string) {
    this.address = _address;
  }
}
