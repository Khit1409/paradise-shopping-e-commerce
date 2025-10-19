import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ServerLoaded } from "./app.service";
import { createNavigationDto } from "./appDto/app.dto";

@Controller("app")
export class AppController {
  constructor(private readonly appService: ServerLoaded) {}

  @Get()
  startRun() {
    this.appService.onModuleInit();
    return "hello";
  }
  @Get("navigation")
  @HttpCode(200)
  async getNavigation() {
    return this.appService.getNavigtionService();
  }
  @Post("create_nav")
  @HttpCode(200)
  async createNavigation(@Body() dto: createNavigationDto[]) {
    return this.appService.createNavigationService(dto);
  }
}
