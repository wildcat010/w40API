/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { EpicHero } from './../schemas/epicHero.schema';
import { List } from './../schemas/list.schema';
import { CreateEpicHeroDto } from './dto/epicHero.dto';

@Injectable()
export class EpicHeroService {
  constructor(
    @InjectModel(EpicHero.name) private epicHeroModel: Model<EpicHero>,
    @InjectModel(List.name) private listModel: Model<List>,
  ) {}

  public async createEpicHero(id: string, epicHeroDto: CreateEpicHeroDto) {
    console.log(`id ${id}, epicHero ${JSON.stringify(epicHeroDto)}`);

    const list = await this.listModel.findById(id);
    console.log(`list ${JSON.stringify(list)}`);

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

    const updatedList = await this.listModel.findByIdAndUpdate(
      id,
      { epicHero: savedHero._id },
      { new: true },
    );

    console.log(`updatedList ${JSON.stringify(updatedList)}`);

    // ✅ Populate list field before returning
    const populatedHero = await this.epicHeroModel
      .findById(savedHero._id)
      .populate('list');

    return populatedHero;
  }

  public async getEpicHeros() {
    return this.epicHeroModel.find().populate('list');
  }
}
