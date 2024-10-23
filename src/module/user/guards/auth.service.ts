import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dtos/register.dto';

import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('send-mail')
    private sendMail: Queue,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(requestBody: RegisterDto) {
    // Check email
    const userByEmail = await this.userRepository.findOneBy({
      email: requestBody.email,
    });
    if (userByEmail) {
      throw new BadRequestException('Email already exists!');
    }

    // Check phone number
    const userByPhone = await this.userRepository.findOneBy({
      phoneNumber: requestBody.phoneNumber,
    });
    if (userByPhone) {
      throw new BadRequestException('Phone number already exists!');
    }

    // Check username
    const userByUsername = await this.userRepository.findOneBy({
      username: requestBody.username,
    });
    if (userByUsername) {
      throw new BadRequestException('Username already exists!');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hashedPassword;

    // Save new user to database
    const newUser = this.userRepository.create({
      ...requestBody,
      createAt: new Date(),
    });
    const userSaved = await this.userRepository.save(newUser);

    // Generate JWT token
    const payload = { id: userSaved.id };
    const verifyToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    // Send verification email
    const mailURL = process.env.MAIL_URL;
    await this.sendMail.add('register', {
      to: requestBody.email,
      name: requestBody.fullName,
      verifyToken,
      mailURL,
    });
  }

  async login(requestBody: LoginDto) {
    const currentAccount = await this.userRepository.findOneBy({
      email: requestBody.email,
    });
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
