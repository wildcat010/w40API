/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './../schemas/list.schema';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/List.dto';
import { UpdateListDto } from './dto/UpdateList.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  public async createList(createListDto: CreateListDto) {
    const date = new Date();

    createListDto.createdAt = date.toISOString();

    const newList = new this.listModel(createListDto);
    return newList.save();
  }

  public getLists() {
    return this.listModel.find();
  }

  public getListById(id: string) {
    return this.listModel
      .findById(id)
      .populate({
        path: 'characters',
        populate: { path: 'datasheets' },
      })
      .populate({
        path: 'battlelines',
        populate: { path: 'datasheets' },
      })
      .populate({
        path: 'epicHero',
        populate: { path: 'datasheets' },
      });
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

  public deleteList(id: string) {
    return this.listModel.findByIdAndDelete(id);
  }
}
