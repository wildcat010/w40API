/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { DatasheetService } from './datasheet.service';
import { CreateDatasheetDto } from './dto/datasheet.dto';

@Controller('datasheet')
export class DatasheetController {
  constructor(private datasheetService: DatasheetService) {}

  @Post()
  createDatasheet(
    @Query('id') id: string,
    @Query('model') model: string,
    @Body() createDatasheetDto: CreateDatasheetDto,
  ) {
    return this.datasheetService.createDatasheet(id, model, createDatasheetDto);
  }

  @Delete()
  deleteDatasheet(@Query('id') id: string) {
    return this.datasheetService.deleteDatasheet(id);
  }

  @Get()
  getDatasheet() {
    return this.datasheetService.getDatasheets();
  }

  @Get(':id')
  getDatasheetById(@Param('id') id: string) {
    return this.datasheetService.getDatasheetById(id);
  }
}
