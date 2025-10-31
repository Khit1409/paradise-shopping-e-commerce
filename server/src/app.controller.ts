import { Controller, Get, HttpCode, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { AppService } from "./app.service";

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  startRun() {
    console.log("Running App");
  }

  @Get("navigation")
  @HttpCode(200)
  async getNavigation(@Res() res: Response) {
    const result = await this.appService.getNavigtionService();
    const { message, resultCode, statusCode, nav } = result;
    return res.status(statusCode).json({ message, resultCode, api: nav });
  }

  @Get("carousel")
  async getCarousel() {
    const data = await this.appService.getCarousel();
    return data;
  }
}
