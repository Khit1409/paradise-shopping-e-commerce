import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto/signin.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
import { CloudinaryService } from "src/cloudinaray/cloudinary.service";
// import { CreateStoreDto } from "src/store/dto/store.dto";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StoreEntity } from "src/store/entity/store.entity";
import { CreateStoreDto } from "src/store/dto/store.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { isValidObjectId, Model } from "mongoose";
import { UserAddress, UserEmail, UserPhone } from "./model/user.model";
import { UpdateUserAccountDto } from "./dto/user-update.dto";

@Injectable()
export class UsersService {
  constructor(
    //mongoose model
    @InjectModel("userAddress")
    private readonly addressModel: Model<UserAddress>,
    @InjectModel("userPhone")
    private readonly phoneModel: Model<UserPhone>,
    @InjectModel("userEmail")
    private readonly emailModel: Model<UserEmail>,
    //
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepo: Repository<StoreEntity>
  ) {}
  /**
   * Register
   * @param dto
   * @returns
   */
  async registerUser(dto: RegisterDto) {
    try {
      if (!dto) {
        throw new BadRequestException("Request not found!");
      }
      const existed = await this.userRepo.findOne({
        where: { emailAddress: dto.user_email },
      });
      if (existed) {
        throw new BadRequestException("Email exited!");
      }
      const hashpass = await bcrypt.hash(dto.user_password, 10);

      if (!hashpass) {
        throw new BadRequestException("Can not hash password");
      }
      /**
       * create new user
       */
      const newUser = await this.userRepo.save({
        firtName: dto.user_firtname,
        lastName: dto.user_lastname,
        userRole: "user",
        emailAddress: dto.user_email,
        phoneNumber: dto.user_phone,
        passwordHashed: hashpass,
        avatarUrl: dto.user_avatar ?? "",
      });
      if (dto.user_address) {
        await this.addressModel.create({
          userId: newUser.userId,
          address: [
            {
              _id: new mongoose.Types.ObjectId(),
              addressName: dto.user_address,
            },
          ],
        });
      }
      return { message: "Successfull", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * client login service
   * @param dto
   * @returns
   */
  async userSignIn(dto: SignInDto) {
    try {
      //check email
      if (!dto.email) {
        throw new BadRequestException("email not  found");
      }
      const user = await this.userRepo.findOne({
        where: { emailAddress: dto.email },
      });

      if (!user) {
        throw new BadRequestException("Email not matched!");
      }
      // check pass
      const checkPass = await bcrypt.compare(dto.password, user.passwordHashed);
      if (!checkPass) {
        throw new BadRequestException("Password wrong!");
      }

      //create token
      const payload = {
        userId: user.userId.toLowerCase(),
        userEmail: user.emailAddress,
        userPhone: user.phoneNumber,
        userRole: user.userRole,
        userStore: user.userStore?.toLowerCase(),
        userAvatar: user.avatarUrl ?? null,
        userFirtName: user.firtName,
        userLastName: user.lastName,
      };
      const token = this.jwt.sign(payload);
      return token;
      // send token to cookie
    } catch (error) {
      throw new InternalServerErrorException(`${error} :${dto.email}`);
    }
  }
  /**
   * Authentication user
   */
  async authenticationUser(token: string) {
    try {
      if (!token) {
        throw new UnauthorizedException(
          "Token not found or your is not logged in"
        );
      }
      //verify token
      const user: {
        userId: string;
        userEmail: string;
        userPhone: string;
        userAvatar: string | null;
        userRole: "user" | "seller";
        userStore: string | null;
        userFirtName: string;
        userLastName: string;
      } = await this.jwt.verify(token, {
        secret: this.config.get<string>("JWT_SECRET"),
      });
      if (!user) {
        throw new BadRequestException("Handle verify token failed!");
      }
      //get address user
      const address = await this.addressModel
        .findOne({ userId: user.userId.toLowerCase() })
        .select("address")
        .lean()
        .then((data) => {
          return data ? data.address : null;
        });
      //get address user
      const phone = await this.phoneModel
        .findOne({ userId: user.userId.toLowerCase() })
        .select("phone")
        .lean()
        .then((data) => {
          return data ? data.phone : null;
        });
      //get address user
      const email = await this.emailModel
        .findOne({ userId: user.userId.toLowerCase() })
        .select("email")
        .lean()
        .then((data) => {
          return data ? data.email : null;
        });
      return {
        ...user,
        userAddress: address,
        userOtherPhone: phone,
        userOtherEmail: email,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   *
   * @param dto
   * @returns
   */
  async createNewStore(dto: CreateStoreDto) {
    if (!dto) {
      throw new BadRequestException("Can not get request");
    }
    if (!dto.owner_id) {
      throw new BadRequestException("Can not get user id!");
    }
    const newStore = await this.storeRepo.save({
      ownerId: dto.owner_id,
      storeName: dto.store_name,
      storeAddress: dto.store_address,
      storeArea: dto.store_area,
      storeAreaSlug: dto.store_area_slug,
    });

    await this.userRepo.update(
      { userId: dto.owner_id },
      { userRole: "seller", userStore: newStore.storeId }
    );
    return { message: "Successfull!", resultCode: 1 };
  }
  /**
   *update user account
   * @param dto
   * @param userId
   * @returns
   */
  async updateUserAccount(dto: UpdateUserAccountDto, userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException("User id is not define on cookies!");
      }
      const thisUser = await this.userRepo.findOne({ where: { userId } });
      if (!thisUser) {
        throw new BadRequestException("user isn't define ");
      }
      //update name
      if (dto.newFirtName) {
        thisUser.firtName = dto.newFirtName;
        await this.userRepo.save(thisUser);
        console.log("Tới fn rồi");
      }
      //update last name
      if (dto.newLastName) {
        console.log("Tới last rồi");
        thisUser.lastName = dto.newLastName;
        await this.userRepo.save(thisUser);
      }
      //update avatart
      if (dto.newAvatar) {
        console.log("Tới avatar rồi");
        thisUser.avatarUrl = dto.newAvatar;
        await this.userRepo.save(thisUser);
      }
      // update address if is valid
      if (dto.address.length > 0) {
         console.log("Tới đây rồi address");
        for (const address of dto.address) {
          if (!address.addressName) continue;
          const addressModel = await this.addressModel.findOne({ userId });
          if (!addressModel) {
            await this.addressModel.create({
              userId,
              address: [
                {
                  _id: new mongoose.Types.ObjectId(),
                  addressName: address.addressName,
                },
              ],
            });
            continue;
          } else if (!isValidObjectId(address._id)) {
            addressModel.address.push({
              _id: new mongoose.Types.ObjectId(),
              addressName: address.addressName,
            });
            await addressModel.save();
            continue;
          }
          const existedAdress = addressModel.address.find((f) =>
            f._id.equals(new mongoose.Types.ObjectId(address._id))
          );
          if (existedAdress) existedAdress.addressName = address.addressName;
          await addressModel.save();
        }
      }
      //update phone if is valid
      if (dto.phone.length > 0) {
         console.log("Tới đây rồi phone");
        for (const phoneDto of dto.phone) {
          if (!phoneDto.phoneNum) continue;
          const phoneModel = await this.phoneModel.findOne({ userId });
          if (!phoneModel) {
            await this.phoneModel.create({
              userId,
              phone: [
                {
                  _id: new mongoose.Types.ObjectId(),
                  phoneNum: phoneDto.phoneNum,
                },
              ],
            });
            continue;
          }
          if (!isValidObjectId(phoneDto._id)) {
            phoneModel.phone.push({
              _id: new mongoose.Types.ObjectId(),
              phoneNum: phoneDto.phoneNum,
            });
            await phoneModel.save();
            continue;
          }
          const exitedPhone = phoneModel.phone.find((f) =>
            f._id.equals(new mongoose.Types.ObjectId(phoneDto._id))
          );
          if (exitedPhone) exitedPhone.phoneNum = phoneDto.phoneNum;
          await phoneModel.save();
        }
      }
      //update email if is valid
      if (dto.email.length > 0) {
         console.log("Tới đây rồi emaik");
        for (const emailDto of dto.email) {
          if (!emailDto.emailAddress) continue;
          const emailModel = await this.emailModel.findOne({ userId });
          if (!emailModel) {
            await this.emailModel.create({
              userId,
              phone: [
                {
                  _id: new mongoose.Types.ObjectId(),
                  emailAddress: emailDto.emailAddress,
                },
              ],
            });
            continue;
          }
          if (!isValidObjectId(emailDto._id)) {
            emailModel.email.push({
              _id: new mongoose.Types.ObjectId(),
              emailAddress: emailDto.emailAddress,
            });
            await emailModel.save();
            continue;
          }
          const existedEmail = emailModel.email.find((f) =>
            f._id.equals(new mongoose.Types.ObjectId(emailDto._id))
          );
          if (existedEmail) existedEmail.emailAddress = emailDto.emailAddress;
          await emailModel.save();
        }
      }
      // return result
       console.log("Tới đây rồi return trong service");
      return { message: "updated", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * test
   */

  async testUser() {
    const useraddress = await this.addressModel
      .findOne({ userId: 2 })
      .select("address")
      .then((data) => {
        return data?.address;
      });

    return useraddress;
  }
}
