/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { Character, CharacterDocument } from 'src/schemas/character.schema';
import { EpicHero, EpicHeroDocument } from 'src/schemas/epicHero.schema';
import { Battleline, BattlelineDocument } from 'src/schemas/battleline.schema';
import { CreateDatasheetDto } from './dto/datasheet.dto';
import { Datasheet, DatasheetDocument } from 'src/schemas/datasheet.schema';

@Injectable()
export class DatasheetService {
  validModels = ['epicHero', 'character', 'battleline'] as const;
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    @InjectModel(EpicHero.name) private epicHeroModel: Model<EpicHeroDocument>,
    @InjectModel(Battleline.name)
    private battlelineModel: Model<BattlelineDocument>,
    @InjectModel(Datasheet.name)
    private datasheetModel: Model<DatasheetDocument>,
  ) {}

  public async createDatasheet(
    id: string,
    model: string,
    createDatasheetDto: CreateDatasheetDto,
  ) {
    const result = await this.getModel(id, model);
    console.log(`result ${result}`);

    if (result) {
      const date = new Date();
      createDatasheetDto.createdAt = date.toISOString();
      if (
        this.validModels.includes(model as (typeof this.validModels)[number])
      ) {
        createDatasheetDto[model] = result._id.toString();
      }
      console.log(`createDatasheetDto ${JSON.stringify(createDatasheetDto)}`);
      const savedDatasheet =
        await this.datasheetModel.create(createDatasheetDto);

      console.log(`savedDatasheet ${JSON.stringify(savedDatasheet)}`);
      if (savedDatasheet) {
        switch (model) {
          case 'epicHero':
            await this.epicHeroModel.findByIdAndUpdate(
              id,
              { datasheet: savedDatasheet._id },
              { new: true },
            );
            return await savedDatasheet?.populate('epicHero');
            break;
          case 'character':
            await this.characterModel.findByIdAndUpdate(
              id,
              { $push: { datasheets: savedDatasheet._id } },
              { new: true },
            );
            return await savedDatasheet?.populate('character');
            break;
          case 'battleline':
            await this.battlelineModel.findByIdAndUpdate(
              id,
              { $push: { datasheets: savedDatasheet._id } },
              { new: true },
            );
            return await savedDatasheet?.populate('battleline');
            break;
        }
      }
    }
  }

  public async getModel(id: string, model: string) {
    const objectId = new mongoose.Types.ObjectId(id);

    let obj: any = null;

    switch (model) {
      case 'epicHero':
        console.log('epicHero');
        obj = await this.epicHeroModel.findById(objectId);
        break;
      case 'character':
        console.log('character');
        obj = await this.characterModel.findById(objectId);
        break;
      case 'battleline':
        console.log('battleline');
        obj = await this.battlelineModel.findById(objectId);
        break;
    }

    if (obj) {
      return obj;
    } else {
      return null;
    }
  }
}
