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
    return await this.categoryModel.find().populate('players').exec();
  }

  async findByCategory(category: string): Promise<Category> {
    return await this.categoryModel
      .findOne({ category })
      .populate('players')
      .exec();
  }

  async addPlayerOnCategory(
    addPlayerOnCategoryDto: AddPlayerToCategoryDto,
  ): Promise<void> {
    const category = await this.findByCategory(addPlayerOnCategoryDto.category);
    category.players.push(addPlayerOnCategoryDto.playerId);

    await this.categoryModel
      .findByIdAndUpdate(category._id, { $set: category })
      .exec();
  }

  async categoryExist(category: string): Promise<boolean> {
    return await this.categoryModel.exists({ category });
  }

  async getCategoryById(_id: string): Promise<Category> {
    return await this.categoryModel.findById(_id);
  }

  async isPlayerAlreadyOnCategory(
    addPlayerOnCategoryDto: AddPlayerToCategoryDto,
  ): Promise<boolean> {
    const { category, playerId } = addPlayerOnCategoryDto;
    const isPlayerOnCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in([playerId])
      .exec();
    if (!isPlayerOnCategory) {
      return false;
    }
    return true;
  }
}
