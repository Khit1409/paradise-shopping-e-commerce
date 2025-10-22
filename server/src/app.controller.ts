import { Body, Controller, Get, HttpCode, Post, Res } from "@nestjs/common";
import { ServerLoaded } from "./app.service";
import { createNavigationDto } from "./appDto/app.dto";
import type { Response } from "express";

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
  async getNavigation(@Res() res: Response) {
    const result = await this.appService.getNavigtionService();
    const { message, resultCode, statusCode, nav } = result;
    return res.status(statusCode).json({ message, resultCode, api: nav });
  }
  @Post("create_nav")
  @HttpCode(200)
  async createNavigation(@Body() dto: createNavigationDto[]) {
    return this.appService.createNavigationService(dto);
  }
}
