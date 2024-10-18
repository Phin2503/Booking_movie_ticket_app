import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './user.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { PaginationDTO } from 'src/generic/pagination.dto';

@Controller('/api/v1/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  register(@Body() requestBody: RegisterDto) {
    return this.authService.register(requestBody);
  }

  @Post('/login')
  login(@Body() requestBody: LoginDto) {
    return this.authService.login(requestBody);
  }

  @Get()
  @UseGuards(new RoleGuard(['user']))
  @UseGuards(AuthGuard)
  findAll(pagination: PaginationDTO) {
    return this.userService.findAll(pagination);
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: User) {
    console.log(currentUser);
    console.log('he');
    return currentUser;
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  updateById(
    @Body() requestBody: UpdateUserDto,
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.updateById(id, requestBody, currentUser);
  }
}
