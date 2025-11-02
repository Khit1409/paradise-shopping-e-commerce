import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { isValidObjectId, Model } from "mongoose";
import { UpdateUserAccountDto } from "./dto/user-update.dto";
import { NormalHandleResponse } from "src/interfaces/server.types";
import { UserInforDoc } from "./model/user.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("userInformations")
    private readonly inforModel: Model<UserInforDoc>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  /**
   * Update user account
   */
  async updateUserAccount(
    dto: UpdateUserAccountDto,
    userId: string
  ): Promise<NormalHandleResponse> {
    try {
      const { address, avatar, email, firtName, lastName, phone } = dto;

      if (!userId)
        throw new BadRequestException("User id is not define on cookies!");

      const thisUser = await this.userRepo.findOne({ where: { userId } });
      if (!thisUser) throw new BadRequestException("user isn't define");

      // Cập nhật SQL
      await this.updateUserEntity(thisUser, { avatar, firtName, lastName });

      // Cập nhật Mongo
      await this.updateUserInfoMongo(userId, { address, email, phone });

      return { message: "updated!", resultCode: 1, statusCode: 200 };
    } catch (error) {
      return { message: `${error}`, statusCode: 500, resultCode: 0 };
    }
  }

  /**
   * Update user basic info (SQL)
   */
  private async updateUserEntity(
    thisUser: UserEntity,
    {
      avatar,
      firtName,
      lastName,
    }: { avatar?: string; firtName?: string; lastName?: string }
  ) {
    if (avatar) thisUser.avatarUrl = avatar;
    if (firtName) thisUser.firtName = firtName;
    if (lastName) thisUser.lastName = lastName;

    await this.userRepo.save(thisUser);
  }

  /**
   * Update user contact info (Mongo)
   */
  private async updateUserInfoMongo(
    userId: string,
    {
      address,
      email,
      phone,
    }: {
      address: { _id?: string; addressName: string }[];
      email: { _id?: string; emailAddress: string }[];
      phone: { _id?: string; phoneNum: string }[];
    }
  ) {
    const inforData = await this.inforModel.findOne({ userId });

    if (inforData) {
      if (email?.length > 0) await this.updateEmailList(inforData, email);
      if (phone?.length > 0) await this.updatePhoneList(inforData, phone);
      if (address?.length > 0) await this.updateAddressList(inforData, address);
    } else {
      const newInfoData = {
        phone:
          phone?.map((p) => ({
            _id: new mongoose.Types.ObjectId(),
            phoneNum: p.phoneNum,
          })) ?? [],
        address:
          address?.map((a) => ({
            _id: new mongoose.Types.ObjectId(),
            addressName: a.addressName,
          })) ?? [],
        email:
          email?.map((e) => ({
            _id: new mongoose.Types.ObjectId(),
            emailAddress: e.emailAddress,
          })) ?? [],
      };
      await this.inforModel.create({ userId, ...newInfoData });
    }
  }

  /**
   * Update email list
   */
  private async updateEmailList(inforData: UserInforDoc, emailList: any[]) {
    for (const data of emailList) {
      if (isValidObjectId(data._id)) {
        const needed = inforData.email.find((f) => f._id.equals(data._id));
        if (needed) {
          if (data.emailAddress !== "") needed.emailAddress = data.emailAddress;
          else await this.inforModel.deleteOne(needed);
        }
      } else {
        inforData.email.push({
          _id: new mongoose.Types.ObjectId(),
          emailAddress: data.emailAddress,
        });
      }
    }
    await inforData.save();
  }

  /**
   * Update phone list
   */
  private async updatePhoneList(inforData: UserInforDoc, phoneList: any[]) {
    for (const data of phoneList) {
      if (isValidObjectId(data._id)) {
        const needed = inforData.phone.find((f) => f._id.equals(data._id));
        if (needed) {
          if (data.phoneNum !== "") needed.phoneNum = data.phoneNum;
          else await this.inforModel.deleteOne(needed);
        }
      } else {
        inforData.phone.push({
          _id: new mongoose.Types.ObjectId(),
          phoneNum: data.phoneNum,
        });
      }
    }
    await inforData.save();
  }

  /**
   * Update address list
   */
  private async updateAddressList(inforData: UserInforDoc, addressList: any[]) {
    for (const data of addressList) {
      if (isValidObjectId(data._id)) {
        const needed = inforData.address.find((f) => f._id.equals(data._id));
        if (needed) {
          if (data.addressName !== "") needed.addressName = data.addressName;
          else await this.inforModel.deleteOne(needed);
        }
      } else {
        inforData.address.push({
          _id: new mongoose.Types.ObjectId(),
          addressName: data.addressName,
        });
      }
    }
    await inforData.save();
  }
}
