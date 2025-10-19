import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { ServerLoaded } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ServerLoaded],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.startRun()).toBe("Hello World!");
    });
  });
});
