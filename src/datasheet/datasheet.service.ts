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

    if (result) {
      const date = new Date();
      createDatasheetDto.createdAt = date.toISOString();
      if (
        this.validModels.includes(model as (typeof this.validModels)[number])
      ) {
        createDatasheetDto[model] = result._id.toString();
      }

      const savedDatasheet =
        await this.datasheetModel.create(createDatasheetDto);

      if (savedDatasheet) {
        switch (model) {
          case 'epicHero':
            await this.epicHeroModel.findByIdAndUpdate(
              id,
              { datasheet: savedDatasheet._id },
              { new: true },
            );
            return await savedDatasheet?.populate('epicHero');

          case 'character':
            await this.characterModel.findByIdAndUpdate(
              id,
              { $push: { datasheets: savedDatasheet._id } },
              { new: true },
            );
            return await savedDatasheet?.populate('character');

          case 'battleline':
            await this.battlelineModel.findByIdAndUpdate(
              id,
              { $push: { datasheets: savedDatasheet._id } },
              { new: true },
            );
            return await savedDatasheet?.populate('battleline');
        }
      }
    }
  }

  public async deleteDatasheet(id: string) {
    //const deletedItem = await this.datasheetModel.findById(id);
    const deletedItem = await this.datasheetModel.findByIdAndDelete(id);

    if (deletedItem) {
      let objFind: any = null;

      for (const model of this.validModels) {
        let endloop: number = 0;
        switch (model) {
          case 'epicHero':
            objFind = await this.epicHeroModel.findById(deletedItem.epicHero);
            if (objFind) {
              endloop = 1;

              return await this.epicHeroModel.findByIdAndUpdate(
                objFind._id,
                { $unset: { datasheet: '' } },
                { new: true },
              );
            }
            break;
          case 'character':
            objFind = await this.characterModel.findById(deletedItem.character);
            if (objFind) {
              endloop = 1;

              return await this.characterModel.findByIdAndUpdate(
                objFind._id,
                { $pull: { datasheets: deletedItem._id } },
                { new: true },
              );
            }
            break;
          case 'battleline':
            objFind = await this.battlelineModel.findById(
              deletedItem.battleline,
            );
            if (objFind) {
              endloop = 1;

              return await this.battlelineModel.findByIdAndUpdate(
                objFind._id,
                { $pull: { datasheets: deletedItem._id } },
                { new: true },
              );
            }
            break;
        }
        if (endloop === 1) {
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
        obj = await this.epicHeroModel.findById(objectId);
        break;
      case 'character':
        obj = await this.characterModel.findById(objectId);
        break;
      case 'battleline':
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
