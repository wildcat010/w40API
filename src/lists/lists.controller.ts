/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ListService } from './list.service';
import mongoose from 'mongoose';
import { UpdateListDto } from './dto/UpdateList.dto';
import { CreateListDto } from './dto/List.dto';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createList(@Body() createListDto: CreateListDto) {
    return this.listService.createList(createListDto);
  }

  @Get()
  getLists() {
    return this.listService.getLists();
  }

  @Get(':id')
  async getListById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log(id);
    if (!isValid) {
      throw new HttpException('id not valid', 404);
    }
    const findUser = await this.listService.getListById(id);
    if (!findUser) {
      throw new HttpException('Not found', 404);
    } else {
      return findUser;
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    console.log(id);
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log(id);
    if (!isValid) {
      throw new HttpException('id not valid', 404);
    }
    console.log(updateListDto);
    const user = this.listService.updateList(id, updateListDto);
    if (user) {
      return user;
    } else {
      throw new HttpException('User not find', 404);
    }
  }

  @Delete(':id')
  async deleteList(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new HttpException('id not valid', 404);
    }

    const ListDeleted = await this.listService.deleteList(id);
    if (ListDeleted) {
      return ListDeleted;
    } else {
      throw new HttpException('User not find', 404);
    }
  }
}
