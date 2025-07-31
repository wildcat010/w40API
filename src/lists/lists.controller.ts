import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createList(@Body() createUserDto) {
    console.log('dto');
    this.listService.createList(createUserDto);
  }
}
