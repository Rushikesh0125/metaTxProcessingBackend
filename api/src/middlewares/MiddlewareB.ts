import {
  BodyParams,
  IMiddleware,
  Inject,
  Middleware,
  Required,
} from "@tsed/common";
import { TransactionService } from "../service/TransactionService";
import { executeTransaction } from "src/service/AutotaskService";
import { UserService } from "src/service/UserService";

/*
 * @middleware
 * To be triggered before the transaction is saved in DB
 *
 * It ensures that only registered user from DB can perform the transactions
 */

@Middleware()
export class MiddlewareB implements IMiddleware {
  constructor(
    @Inject() private transactionService: TransactionService,
    @Inject() private userService: UserService
  ) {}

  async use(@Required @BodyParams("from") _from: string): Promise<any> {
    try {
      const user = await this.userService.getUserByaddress(_from);

      if (user == null) {
        throw new Error("UnAuthorized access");
      }
    } catch (error) {
      console.log("Something went wrong at middleWare", error.message);
    }
  }
}
