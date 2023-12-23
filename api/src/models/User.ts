import { Property, Required } from "@tsed/common";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class User {
  @Required()
  address: string;

  constructor(_address: string) {
    this.address = _address;
  }
}
