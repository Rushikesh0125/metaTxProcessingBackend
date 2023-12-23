import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  Required,
  Status,
} from "@tsed/common";
import { Description } from "@tsed/swagger";
import { User } from "../models/User";
import { UserService } from "../service/UserService";

/*
 * @controller - User
 * To handle registering, retrival, deletion of users
 */

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/")
  @Status(200, { description: "Created", type: User })
  async save(
    @Description("user address") @BodyParams() @Required() user: User
  ): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Get("/")
  @Status(200, { description: "Created", type: User, collectionType: Array })
  async getAllUsers(): Promise<User[]> | null {
    const userList = await this.userService.getAllUsers();
    return userList;
  }

  @Get("/byAddress")
  @Status(200, { description: "Fetched", type: User })
  async getUserByAddress(
    @Description("user address") @BodyParams() @Required() address: string
  ): Promise<User> | null {
    const user = await this.userService.getUserByaddress(address);
    return user;
  }
}
