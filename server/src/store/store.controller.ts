import { Controller } from "@nestjs/common";
import { StoreService } from "./store.service";
import { UsersService } from "src/users/users.service";

@Controller("store")
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UsersService
  ) {}
}
