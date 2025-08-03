/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { List } from './../schemas/list.schema';
import { Character } from 'src/schemas/character.schema';
import { CreateCharacterDto } from './dto/Character.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    @InjectModel(List.name) private listModel: Model<List>,
  ) {}

  public async createBattleline(
    id: string,
    createCharacter: CreateCharacterDto,
  ) {
    const list = await this.listModel.findById(id);
    if (list) {
      const date = new Date();
      createCharacter.createdAt = date.toISOString();
      createCharacter.list = list._id.toString();
      const newCharacter = new this.characterModel(createCharacter);
      const characterCreated = await newCharacter.save();
      if (characterCreated) {
        await this.listModel.findByIdAndUpdate(
          id,
          { $push: { characters: characterCreated._id } },
          { new: true },
        );

        return await characterCreated?.populate('list');
      }
    }
  }

  public async getCharacters() {
    return await this.characterModel.find().populate('list');
  }

  public async getCharacterById(id: string) {
    return await this.characterModel.findById(id);
  }

  public async deleteCharacter(id: string) {
    const deletedItem = await this.characterModel.findByIdAndDelete(id);
    if (deletedItem) {
      const listId = deletedItem.list;
      return await this.listModel.findByIdAndUpdate(
        listId,
        { $pull: { characters: deletedItem._id } },
        { new: true },
      );
    }
  }
}
