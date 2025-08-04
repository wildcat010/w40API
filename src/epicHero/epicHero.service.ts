/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { EpicHero, EpicHeroDocument } from './../schemas/epicHero.schema';
import { List, ListDocument } from './../schemas/list.schema';
import { CreateEpicHeroDto } from './dto/epicHero.dto';

@Injectable()
export class EpicHeroService {
  constructor(
    @InjectModel(EpicHero.name) private epicHeroModel: Model<EpicHeroDocument>,
    @InjectModel(List.name) private listModel: Model<ListDocument>,
  ) {}

  public async createEpicHero(id: string, epicHeroDto: CreateEpicHeroDto) {
    const list = await this.listModel.findById(id);

    if (!list) {
      throw new Error(`List with ID ${id} not found`);
    }

    const date = new Date();
    epicHeroDto.createdAt = date.toISOString();
    epicHeroDto.list = list._id;

    const newHero = new this.epicHeroModel(epicHeroDto);
    const savedHero = await newHero.save();

    if (!savedHero) {
      throw new Error('EpicHero could not be saved');
    }

    await this.listModel.findByIdAndUpdate(
      id,
      { epicHero: savedHero._id },
      { new: true },
    );

    const populatedHero = await this.epicHeroModel
      .findById(savedHero._id)
      .populate('list');

    return populatedHero;
  }

  public async getEpicHeros() {
    return this.epicHeroModel.find().populate('list');
  }

  public async deleteEpicHero(id: string) {
    const deletedItem = await this.epicHeroModel.findByIdAndDelete(id);
    if (deletedItem) {
      const listId = deletedItem.list;
      return await this.listModel.findByIdAndUpdate(
        listId,
        { $unset: { epicHero: deletedItem._id } },
        { new: true },
      );
    }
  }
}
