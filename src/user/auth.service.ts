import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(requestBody: RegisterDto) {
    requestBody.sanitize();
    //check email
    const userByEmail = await this.userService.findByEmail(requestBody.email);
    if (userByEmail) {
      throw new BadRequestException('Email already exist !');
    }

    //hash password
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hashedPassword;

    //save to db
    const userSaved = await this.userService.create(requestBody);

    //generate jwt token
    const payload = {
      id: userSaved.id,
      fullName: userSaved.fullName,
      username: userSaved.username,
      phoneNumber: userSaved.phoneNumber,
      email: userSaved.email,
      dateOfBirth: userSaved.dateOfBirth,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      msg: 'User haas been created !',
      payload,
      access_token,
    };
  }

  async login(requestBody: LoginDto) {
    requestBody.sanitize();

    const currentAccount = await this.userService.findByEmail(
      requestBody.email,
    );
    if (!currentAccount) {
      throw new NotFoundException({
        message: 'Invalid Credentials !',
      });
    }
    const isMatchPass: boolean = await bcrypt.compare(
      requestBody.password,
      currentAccount.password,
    );

    if (!isMatchPass) {
      throw new BadRequestException('Invalid Credentials !');
    }

    //generate jwt token
    const payload = {
      id: currentAccount.id,
      fullName: currentAccount.fullName,
      username: currentAccount.username,
      phoneNumber: currentAccount.phoneNumber,
      email: currentAccount.email,
      dateOfBirth: currentAccount.dateOfBirth,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      msg: 'Login Successfully !',
      payload,
      access_token,
    };
  }
}
