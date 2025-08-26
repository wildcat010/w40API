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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('list')
@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a list' })
  @ApiResponse({ status: 201, description: 'The list has been created.' })
  createList(@Body() createListDto: CreateListDto) {
    return this.listService.createList(createListDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the users' })
  @ApiResponse({ status: 201, description: 'Return lists.' })
  getLists() {
    return this.listService.getLists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a list by id' })
  @ApiResponse({ status: 201, description: 'Return list.' })
  async getListById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

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
  @ApiOperation({ summary: 'Get a list by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'List ID' })
  updateUser(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new HttpException('id not valid', 404);
    }

    const user = this.listService.updateList(id, updateListDto);
    if (user) {
      return user;
    } else {
      throw new HttpException('User not find', 404);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a list by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'List ID' })
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
