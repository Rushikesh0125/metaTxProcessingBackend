import { MongooseModel } from "@tsed/mongoose";
import { Transaction } from "../models/Transaction";
import { Inject, Service } from "@tsed/common";
import { error } from "console";
import { transactionBodyParams } from "../types/types";
import { getTransactionData } from "../utils/getTransactionData";
import { contractaddresses } from "../constants";
import { promises } from "fs";

/*
 *@service
 *Transaction service
 *
 *It injects mongoose model in this case a Transaction model
 *
 *this class interacts with this model to save, delete, retrive the transaction
 *as per controller's request or invokation in other services
 *
 */
@Service()
export class TransactionService {
  @Inject(Transaction)
  private Transaction: MongooseModel<Transaction>;

  async createTransaction(
    transactionData: transactionBodyParams
  ): Promise<Transaction> {
    try {
      const { from, data, signer } = transactionData;

      const { request, signature } = await getTransactionData(
        data._msg,
        data._for,
        from,
        signer
      );

      const to = contractaddresses();

      const newTransaction = new this.Transaction({
        from,
        to,
        request,
        signature,
      });

      return await newTransaction.save();
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async getAllTransactions(): Promise<Transaction[]> {
    try {
      const transactions = this.Transaction.find().lean().exec();
      return transactions || [];
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to get transactions");
    }
  }

  async getTransactionById(id: string): Promise<Transaction> {
    try {
      return this.Transaction.findById(id);
    } catch (error) {
      console.log("Failed to get transaction", error.message);
    }
  }

  async delete(transaction: Transaction): Promise<any> {
    try {
      return this.Transaction.deleteOne({
        sender: transaction.sender,
        signature: transaction.signature,
        request: transaction.request,
      }).exec();
    } catch (error) {
      console.log(error.msg);
      throw new Error("Failed to remove records");
    }
  }
}
