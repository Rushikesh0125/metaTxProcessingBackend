import {
  BodyParams,
  Controller,
  Get,
  PathParams,
  Post,
  Required,
  Status,
  UseAfter,
  UseBefore,
} from "@tsed/common";
import { Description } from "@tsed/swagger";
import { Transaction } from "../models/Transaction";
import { TransactionService } from "../service/TransactionService";
import { error } from "console";
import { Signer } from "ethers";
import { transactionBodyParams } from "src/types/types";
import { MiddlewareA } from "src/middlewares/MiddlewareA";
import { MiddlewareB } from "src/middlewares/MiddlewareB";

/*
 * @controller - transaction
 * To handle saving, retrival, deletion of transactions
 */

@Controller("/transactions")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post("/")
  @Status(200, { description: "Created", type: Transaction })
  @UseAfter(MiddlewareA)
  @UseBefore(MiddlewareB)
  async save(
    @Description("Transaction model")
    @BodyParams()
    @Required()
    transactionBody: transactionBodyParams
  ): Promise<Transaction> {
    return await this.transactionService.createTransaction(transactionBody);
  }

  @Get("/")
  @Status(200, {
    description: "Fetched",
    type: Transaction,
    collectionType: Array,
  })
  async getAllTransactions(): Promise<Transaction[]> {
    const transactionList = await this.transactionService.getAllTransactions();
    if (transactionList) return transactionList;
    throw new error("No Transactions");
  }

  @Get("/:id")
  @Status(200, { description: "Fetched", type: Transaction })
  async getById(
    @Description("transaction id") @PathParams("id") @Required() id: string
  ): Promise<Transaction> {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction) return transaction;
    throw new error("No transaction found with given Id");
  }
}
