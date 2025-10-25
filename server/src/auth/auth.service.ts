import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/auth-register.dto";
import {
  AuthenticationReponse,
  NormalHandleResponse,
} from "src/interfaces/server.types";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import * as bcryt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import type { Response } from "express";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { isValidObjectId, Model } from "mongoose";
import { UserAddress, UserEmail, UserPhone } from "src/users/model/user.model";
@Injectable()
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
    @InjectModel("userAddress")
    private readonly addressModel: Model<UserAddress>,
    @InjectModel("userPhone")
    private readonly phoneModel: Model<UserPhone>,
    @InjectModel("userEmail")
    private readonly emailModel: Model<UserEmail>
  ) {}
  /**
   * user register new account
   * @param dto
   * @returns {NormalHandleResponse}
   */
  async registerService(dto: RegisterDto): Promise<NormalHandleResponse> {
    try {
      /**
       * check validate important request in dto from client
       */
      if (!dto.user_password || !dto.user_email! || !dto.user_phone) {
        return {
          message: "not send important request!",
          resultCode: 0,
          statusCode: 401,
        };
      }
      /**
       * leak value
       */
      const {
        user_email,
        user_firtname,
        user_lastname,
        user_password,
        user_phone,
        user_avatar,
      } = dto;
      /**
       * check existed email in database
       */
      const exitedEmail = await this.userRepo.findOne({
        where: { emailAddress: user_email },
      });
      /**
       * return if existed email
       */
      if (!exitedEmail) {
        return { message: "Email is exited", resultCode: 0, statusCode: 409 };
      }
      /**
       * hash password
       */
      const hashPassword = await bcryt.hash(user_password, 10);
      /**
       * create new account if have not problem
       */
      const newUser = {
        avatarUrl: user_avatar ?? "",
        firtName: user_firtname ?? "",
        lastName: user_lastname ?? "",
        fullName: `${user_lastname} ${user_firtname}`, //  create
        phoneNumber: user_phone,
        passwordHashed: hashPassword,
        emailAddress: user_email,
      };
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
   * login server
   * authentication role from baseUrl and get token name by it when
   * finished login handle
   * @param dto
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
       * check user
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
       * create token payload and token
       */
      const payload = {
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
      const token = this.jwt.sign(payload);
      /**
       * send cookie
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
        secret: process.env.JWT_SECRET,
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
      //response
      const api = {
        ...user,
        userAddress: address,
        userOtherPhone: phone,
        userOtherEmail: email,
      };
      return { message: "successfull!", resultCode: 1, statusCode: 200, api };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
