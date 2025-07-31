import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './../schemas/list.schema';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/List.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  public createList(createListDto: CreateListDto) {
    const newList = new this.listModel(createListDto);
    console.log('newList', newList);
    return newList.save();
  }
}
