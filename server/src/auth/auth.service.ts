import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/auth-register.dto";
import {
  AuthenticationReponse,
  NewUserDataType,
  NormalHandleResponse,
  TokenPayLoadDataType,
  UserAddressDataType,
  UserEmailDataType,
  UserInformationDataType,
  UserPhoneDataType,
} from "src/interfaces/server.types";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import * as bcryt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import type { Response } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserInforDoc } from "src/users/model/user.model";
@Injectable()
/**
 * Handle relation to authenticate information
 * @func register
 * @func login
 * @func authentication
 */
export class AuthService {
  constructor(
    /**
     * entity
     */
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    // service in app module
    private readonly jwt: JwtService,
    //mongoose model
    @InjectModel("userInformations")
    private readonly infoModel: Model<UserInforDoc>
  ) {}

  testVerify() {
    const v = this.jwt.verify(
      "$2b$10$6YKyYHpGpASqqwxf6qB47eqxioxDGAdQfn4tw.Tq0Q5PZqMHP/Yte"
    );
    return this.jwt;
  }
  /**
   * get user information
   * email list, phone list, address list
   * @param id
   * @returns {UserAddressDataType[]}
   * @returns {UserPhoneDataType[]}
   * @returns {UserEmailDataType[]}
   */
  async getUserInformation(id: string): Promise<UserInformationDataType> {
    if (!id) {
      throw new UnauthorizedException("id is not define!");
    }
    try {
      const userId = id.toLowerCase();
      const info = await this.infoModel.findOne({ userId });
      if (!info) {
        return {
          userOtherEmail: [],
          userOtherPhone: [],
          userAddress: [],
        };
      }
      const { address, phone, email } = info;
      return {
        userOtherEmail: email ?? [],
        userOtherPhone: phone ?? [],
        userAddress: address ?? [],
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * user register new account
   * @param dto
   * @returns {NormalHandleResponse}
   */
  async registerService(dto: RegisterDto): Promise<NormalHandleResponse> {
    try {
      /**
       * leak value
       */
      const { email, firtname, lastname, password, phone, avatar } = dto;
      /**
       * check validate important request in dto from client
       */
      if (!password || !email! || !phone) {
        return {
          message: "not send important request!",
          resultCode: 0,
          statusCode: 401,
        };
      }
      /**
       * check existed email in database
       */
      const exitedEmail = await this.userRepo.findOne({
        where: { emailAddress: email },
      });
      /**
       * return if existed email
       */
      if (exitedEmail) {
        return { message: "Email is exited", resultCode: 0, statusCode: 409 };
      }
      /**
       * hash password
       */
      const hashPassword = await bcryt.hash(password, 10);
      /**
       * create new account if have not problem
       */
      const newUser: NewUserDataType = {
        avatarUrl: avatar ?? "",
        firtName: firtname ?? "",
        lastName: lastname ?? "",
        fullName: `${lastname} ${firtname}`,
        phoneNumber: phone,
        passwordHashed: hashPassword,
        emailAddress: email,
        userRole: "user",
      };
      /**
       * save
       */
      await this.userRepo.save(newUser);
      /**
       * response result
       */
      return {
        resultCode: 1,
        statusCode: 200,
        message: "register handle successfull!",
      };
    } catch (error) {
      return { resultCode: 0, statusCode: 500, message: `${error}` };
    }
  }
  /**
   * login handle
   * client send email pass and role, this func compare and send token
   * to cookie for authentication
   * finished login handle
   * @param dto
   * @param email
   * @param password
   * @param role
   * @return {NormalHandleResponse}
   */
  async signInService(
    email: string,
    password: string,
    role: string,
    res: Response
  ): Promise<NormalHandleResponse> {
    try {
      /**
       * check user and leak data
       */
      const checkExistedUser = await this.userRepo.findOne({
        where: { emailAddress: email },
      });
      if (!checkExistedUser) {
        return {
          message: "User is not define!",
          resultCode: 0,
          statusCode: 401,
        };
      }
      const {
        passwordHashed,
        avatarUrl,
        userId,
        emailAddress,
        phoneNumber,
        firtName,
        lastName,
        fullName,
        userRole,
        userStore,
      } = checkExistedUser;
      /**
       * compare password from request and password from db
       */
      const matchedPass = await bcryt.compare(password, passwordHashed);
      if (!matchedPass) {
        return {
          message: "Password is not match!",
          resultCode: 0,
          statusCode: 404,
        };
      }
      /**
       * get address & phone & email
       */
      const { userAddress, userOtherEmail, userOtherPhone } =
        await this.getUserInformation(userId);
      /**
       * create token payload and token
       */
      const payload: TokenPayLoadDataType = {
        userId: userId.toLowerCase(),
        userEmail: emailAddress,
        userPhone: phoneNumber,
        userRole: userRole,
        userStore: userStore?.toLowerCase(),
        userAvatar: avatarUrl ?? null,
        userFirtName: firtName,
        userLastName: lastName,
        userFullName: fullName,
      };
      const token = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: "2d",
      });
      /**
       * send token to cookie
       */
      res.cookie(`${role}_token`, token, {
        maxAge: 3600000 * 24,
        secure: false,
        sameSite: "strict",
        httpOnly: true,
      });
      /**
       * response result
       */
      return {
        resultCode: 1,
        statusCode: 200,
        message: "login handle successfull!",
      };
    } catch (error) {
      return { message: `${error}`, resultCode: 0, statusCode: 500 };
    }
  }
  /**
   * Authentication handle
   * response user data
   * @param token
   * @return {AuthenticationReponse}
   */
  async authentication(token: string): Promise<AuthenticationReponse> {
    try {
      //check validate
      if (!token) {
        throw new UnauthorizedException(
          "Token not found or your is not logged in"
        );
      }
      //verify token
      const user: TokenPayLoadDataType = await this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!user) {
        throw new BadRequestException("Handle verify token failed!");
      }
      const info = await this.getUserInformation(user.userId);
      const data = { ...user, ...info };
      /**
       * response
       */
      return {
        message: "successfull!",
        resultCode: 1,
        statusCode: 200,
        api: data,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
