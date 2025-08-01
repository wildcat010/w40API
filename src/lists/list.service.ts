/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './../schemas/list.schema';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/List.dto';
import { UpdateListDto } from './dto/UpdateList.dto';
import { Infantry } from 'src/schemas/Infantry.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private listModel: Model<List>,
    @InjectModel(Infantry.name) private infantryModel: Model<Infantry>,
  ) {}

  public async createList({ infantry, ...createListDto }: CreateListDto) {
    const date = new Date();
    if (infantry) {
      infantry.createdAt = date.toISOString();
      createListDto.createdAt = date.toISOString();
      const newInfantry = new this.infantryModel(infantry);
      const saveNewInfantry = await newInfantry.save();
      const newList = new this.listModel({
        ...createListDto,
        settings: saveNewInfantry._id,
      });
      return newList.save();
    } else {
      const newList = new this.listModel(createListDto);
      return newList.save();
    }
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

  public deleteList(id: string) {
    return this.listModel.findByIdAndDelete(id);
  }
}
