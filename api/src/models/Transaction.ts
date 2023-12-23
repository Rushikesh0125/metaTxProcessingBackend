import { Property, Required } from "@tsed/common";
import { Model, ObjectID } from "@tsed/mongoose";

/*
 * @Model
 * Transaction data model
 *
 * defines attributes and field that transaction should consist
 * Also defines constructor, should be invoked to create an object of transaction type
 */

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
