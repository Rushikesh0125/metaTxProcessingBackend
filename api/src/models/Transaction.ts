import { Property, Required } from "@tsed/common";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class Transaction {
  @Required()
  sender: string;

  @Required()
  receiver: string;

  @Required()
  request: any;

  @Required()
  signature: any;

  constructor(
    _sender: string,
    _receiver: string,
    _request: any,
    _signature: any
  ) {
    this.sender = _sender;
    this.receiver = _receiver;
    this.request = _request;
    this.signature = _signature;
  }
}
