import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddPlayerToCategoryDto } from './dto/add-player-to-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.schema';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';

export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async saveCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
    await (await this.categoryModel.create(createCategoryDto)).save();
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<void> {
    const { category } = updateCategoryDto;
    await this.categoryModel
      .findOneAndUpdate(
        {
          category,
        },
        {
          $set: { updateCategoryDto },
        },
      )
      .exec();
  }

  async deleteCategory(_id: string): Promise<void> {
    await this.categoryModel.deleteOne({ _id }).exec();
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findByCategory(category: string): Promise<Category> {
    const result = await this.categoryModel.findOne({ category }).exec();

    if (!result) {
      throw new NotFoundException(`Category ${category} not found`);
    }
    return result;
  }

  async addPlayerOnCategory(
    addPlayerOnCategoryDto: AddPlayerToCategoryDto,
  ): Promise<void> {
    try {
      const category = await this.categoryModel.findOne({
        category: addPlayerOnCategoryDto.category,
      });

      if (!category) {
        throw new NotFoundException(`Category ${category} not found`);
      }

      category.players.push(addPlayerOnCategoryDto.playerId);

      await this.categoryModel.updateOne({ _id: category._id }, category);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async categoryExist(category: string): Promise<boolean> {
    return await this.categoryModel.exists({ category });
  }

  async getCategoryById(_id: string): Promise<Category> {
    const result = await this.categoryModel.findById(_id);
    if (!result) {
      throw new NotFoundException(`Category ${_id} not found`);
    }
    return result;
  }

  async isPlayerAlreadyOnCategory(
    addPlayerOnCategoryDto: AddPlayerToCategoryDto,
  ): Promise<boolean> {
    const { category, playerId } = addPlayerOnCategoryDto;
    const isPlayerOnCategory = await this.categoryModel
      .findOne({ category })
      .where('players')
      .in([playerId])
      .exec();
    if (!isPlayerOnCategory) {
      return false;
    }
    return true;
  }

  async findCategoryFromPlayer(playerId: string): Promise<Category> {
    const playerCategory = await this.categoryModel
      .findOne()
      .where('players')
      .in([playerId])
      .exec();
    if (!playerCategory) {
      throw new NotFoundException(`Not found category for player ${playerId}`);
    }
    return playerCategory;
  }
}
