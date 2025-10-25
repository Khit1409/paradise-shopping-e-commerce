import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import { Connection, Model } from "mongoose";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { NavigationDoc } from "./app.model";
import { createNavigationDto } from "./app-dto/app.dto";
import { createUrlNav } from "./feature/feature";
import {
  NavigationDataType,
  NavigationReponse,
} from "./interfaces/server.types";

@Injectable()
export class ServerLoaded implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
    @InjectModel("navigations")
    private readonly navigationModel: Model<NavigationDoc>,
    @InjectConnection() private readonly mongooseConnection: Connection // inject Mongoose connection
  ) {}

  onModuleInit() {
    // Kiểm tra TypeORM
    if (this.dataSource.isInitialized) {
      console.log("Server kết nối Database SQL thành công");
    } else {
      console.log("Kết nối SQL bị lỗi");
    }
    // Kiểm tra Mongoose
    if (Number(this.mongooseConnection.readyState) === 1) {
      // 1 = connected
      console.log("Server kết nối MongoDB thành công");
    } else {
      console.log("Kết nối MongoDB bị lỗi");
    }
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
  //create navigation
  async createNavigationService(dto: createNavigationDto[]) {
    try {
      for (const nav of dto) {
        const newNav = await this.navigationModel.create({
          navIcon: nav.nav_icon,
          navName: nav.nav_name,
          navUrl: nav.nav_url ?? createUrlNav(nav.nav_name),
        });
        if (!newNav) {
          throw new InternalServerErrorException(
            "error when create navigation"
          );
        }
      }
      return { message: "successfull", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
