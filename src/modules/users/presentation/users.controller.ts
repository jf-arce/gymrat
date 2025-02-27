import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { HandleError } from 'src/modules/shared/errors/handle.error';
import { GetUserDto } from '../application/dto/get-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
      return { message: 'Usuario creado con éxito' };
    } catch (error) {
      throw HandleError.throw(error);
    }
  }

  @Get()
  async findAll(): Promise<GetUserDto[]> {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      throw HandleError.throw(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOneById(id);
      return user;
    } catch (error) {
      throw HandleError.throw(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw HandleError.throw(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
    } catch (error) {
      throw HandleError.throw(error);
    }
  }
}
