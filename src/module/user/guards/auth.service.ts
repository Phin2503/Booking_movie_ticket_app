import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dtos/register.dto';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('send-mail')
    private sendMail: Queue,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(requestBody: RegisterDto) {
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
    };

    const verifyToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    const mailURL = process.env.MAIL_URL;

    await this.sendMail.add('register', {
      to: requestBody.email,
      name: requestBody.fullName,
      verifyToken: verifyToken,
      mailURL: mailURL,
    });
  }

  async login(requestBody: LoginDto) {
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
