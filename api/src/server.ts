import { GlobalAcceptMimesMiddleware } from "@tsed/common";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/mongoose";
import "@tsed/platform-express";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as dotenv from "dotenv";
import { MiddlewareA } from "./middlewares/MiddlewareA";
import { MiddlewareB } from "./middlewares/MiddlewareB";

//server config

@Configuration({
  rootDir: __dirname,
  acceptMimes: ["application/json"],
  port: process.env.PORT || 3000,
  httpsPort: false,
  passport: {},
  mongoose: {
    url:
      process.env.MONGO_URI ||
      "mongodb+srv://jadhavrushikeshggl:Jk772Ck7lssxDsB4@cluster0.nc8jlgc.mongodb.net/?retryWrites=true&w=majority" ||
      "mongodb://127.0.0.1:27017/example-mongoose-test",
    connectionOptions: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
  swagger: {
    path: "/api-docs",
  },
  debug: false,
})
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );

    return null;
  }
}
