/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './../schemas/list.schema';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/List.dto';
import { UpdateListDto } from './dto/UpdateList.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  public createList(createListDto: CreateListDto) {
    const newList = new this.listModel(createListDto);
    console.log('newList', newList);
    return newList.save();
  }

  public getLists() {
    return this.listModel.find();
  }

  public getListById(id: string) {
    return this.listModel.findById(id);
  }

  public updateList(id: string, updateListDto: UpdateListDto) {
    return this.listModel.findByIdAndUpdate(
      id,
      {
        army: updateListDto.army,
        pointsLimit: updateListDto.pointsLimit,
      },
      { new: true },
    );
  }
}
