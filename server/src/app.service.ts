import {
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import { Connection, Model } from "mongoose";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { CarouselDoc, NavigationDoc } from "./app.model";
import {
  NavigationDataType,
  NavigationReponse,
} from "./interfaces/server.types";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
    @InjectModel("navigations")
    private readonly navigationModel: Model<NavigationDoc>,
    @InjectModel("carousel")
    private readonly carouselModel: Model<CarouselDoc>,
    @InjectConnection() private readonly mongooseConnection: Connection
  ) {}

  onModuleInit() {
    const sqlStatus = this.dataSource.isInitialized ? "Connected" : "Failed";
    const mongoStatus =
      Number(this.mongooseConnection.readyState) === 1 ? "Connected" : "Failed";

    console.log("======== Database Connection Status ========");
    console.table([
      { Database: "PostgreSQL / MySQL (TypeORM)", Status: sqlStatus },
      { Database: "MongoDB (Mongoose)", Status: mongoStatus },
    ]);
  }

  //navigation
  async getNavigtionService(): Promise<NavigationReponse> {
    try {
      const nav = await this.navigationModel
        .find()
        .select("_id navIcon navName navUrl")
        .lean<NavigationDataType[]>();
      if (nav.length == 0) {
        return {
          message: "navigation is not define",
          nav: [],
          resultCode: 0,
          statusCode: 401,
        };
      }
      return { message: "successfull", nav, resultCode: 1, statusCode: 200 };
    } catch (error) {
      return { message: `${error}`, nav: [], resultCode: 0, statusCode: 500 };
    }
  }
  //
  async getCarousel() {
    const data = await this.carouselModel.find();
    return data;
  }
}
