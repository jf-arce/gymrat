import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HandleError } from 'src/modules/shared/errors/handle.error';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
      return { message: 'Usuario creado con éxito' };
    } catch (error) {
      HandleError.throwError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      HandleError.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOneById(id);
      return user;
    } catch (error) {
      HandleError.throwError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(id, updateUserDto);
    } catch (error) {
      HandleError.throwError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
    } catch (error) {
      HandleError.throwError(error);
    }
  }
}
