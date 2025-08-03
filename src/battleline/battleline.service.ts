/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Battleline } from 'src/schemas/battleline.schema';
import { List } from 'src/schemas/list.schema';
import { CreateBattlelineDto } from './dto/battleline.dto';

@Injectable()
export class BattlelineService {
  constructor(
    @InjectModel(Battleline.name) private battlelineModel: Model<Battleline>,
    @InjectModel(List.name) private listModel: Model<List>,
  ) {}
  public async createBattleline(
    id: string,
    createBattleline: CreateBattlelineDto,
  ) {
    const list = await this.listModel.findById(id);
    if (list) {
      const date = new Date();
      createBattleline.createdAt = date.toISOString();
      createBattleline.list = list._id.toString();
      const newBattleline = new this.battlelineModel(createBattleline);
      const battlelineCreated = await newBattleline.save();
      if (battlelineCreated) {
        await this.listModel.findByIdAndUpdate(
          id,
          { $push: { battlelines: battlelineCreated._id } },
          { new: true },
        );

        return await battlelineCreated?.populate('list');
      }
    }
  }

  public async getBattlelines() {
    return await this.battlelineModel.find().populate('list');
  }

  public async getBattlelineById(id: string) {
    return await this.battlelineModel.findById(id);
  }

  public async deleteBattleline(id: string) {
    const deletedItem = await this.battlelineModel.findByIdAndDelete(id);
    if (deletedItem) {
      const listId = deletedItem.list;
      return await this.listModel.findByIdAndUpdate(
        listId,
        { $pull: { battlelines: deletedItem._id } },
        { new: true },
      );
    }
  }
}
