import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() usuario: Partial<User>,
  ): Promise<User | null> {
    return this.userService.update(id, usuario);
  }

  @Put(':id/reset-password')
  updatePassword(
    @Param('id') id: string,
    @Body('password') newPassword: string,
  ): Promise<User | null> {
    return this.userService.updatePassword(id, newPassword);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
