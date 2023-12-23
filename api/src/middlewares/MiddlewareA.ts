import { IMiddleware, Inject, Middleware } from "@tsed/common";
import { TransactionService } from "../service/TransactionService";
import { executeTransaction } from "src/service/AutotaskService";
import { UserService } from "src/service/UserService";

@Middleware()
export class MiddlewareA implements IMiddleware {
  constructor(@Inject() private transactionService: TransactionService) {}

  async use(): Promise<any> {
    try {
      const transactions = await this.transactionService.getAllTransactions();

      if (transactions.length == 100) {
        for (let i = 0; i < transactions.length; i++) {
          await executeTransaction(transactions[i]);
          await this.transactionService.delete(transactions[i]);
        }
      }
    } catch (error) {
      console.log("Something went wrong at middleWare", error.message);
    }
  }
}
