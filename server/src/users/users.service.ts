import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StoreEntity } from "src/store/entity/store.entity";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { isValidObjectId, Model } from "mongoose";
import { UserAddress, UserEmail, UserPhone } from "./model/user.model";
import { UpdateUserAccountDto } from "./dto/user-update.dto";
import { NormalHandleResponse } from "src/interfaces/server.types";

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
    //entity
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepo: Repository<StoreEntity>
  ) {}
  /**
   *update user account
   * @param dto
   * @param userId
   * @returns
   */
  async updateUserAccount(
    dto: UpdateUserAccountDto,
    userId: string
  ): Promise<NormalHandleResponse> {
    try {
      //check validate
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
      }
      //update last name
      if (dto.newLastName) {
        thisUser.lastName = dto.newLastName;
        await this.userRepo.save(thisUser);
      }
      //update avatart
      if (dto.newAvatar) {
        thisUser.avatarUrl = dto.newAvatar;
        await this.userRepo.save(thisUser);
      }
      // update address if is valid
      if (dto.address.length > 0) {
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
      return { message: "updated", resultCode: 1, statusCode: 200 };
    } catch (error) {
      return { message: `${error}`, statusCode: 500, resultCode: 0 };
    }
  }
}
