import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorHandler } from 'src/utils/error.handler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { $Enums } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';

const { ADMIN } = $Enums.UserRoleEnum;

@ApiCookieAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOneById(id);
      return user;
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Roles(ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Roles(ADMIN)
  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    try {
      await this.usersService.restore(id);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }
}
