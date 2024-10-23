import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dtos/register.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { Permission } from './helper/checkPermission.helper';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  create(requestBody: RegisterDto) {
    const user = this.userRepository.create(requestBody);
    user.createAt = new Date();

    console.log(user);
    return this.userRepository.save(user);
  }

  findAll(pagination: PaginationDTO) {
    return this.userRepository.find({
      skip: pagination.skip,
      take: pagination.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async updateById(id: string, requestBody: UpdateUserDto, currentUser: User) {
    let user = await this.userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException('Not found your account !! try again ...');
    }

    Permission.check(id, currentUser);

    user = { ...user, ...requestBody };

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
  }
}
