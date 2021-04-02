import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PlayerRepository } from '../player/player.repository';
import { CategoryRepository } from './category.repository';
import { AddPlayerToCategoryDto } from './dto/add-player-to-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepo: CategoryRepository,

    @Inject(PlayerRepository) private readonly playerRepo: PlayerRepository,
  ) {}

  async saveCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
    const categoryAlreadyExist = await this.categoryRepo.categoryExist(
      createCategoryDto.category,
    );

    if (categoryAlreadyExist) {
      throw new ConflictException(
        `Category ${createCategoryDto.category} already exist`,
      );
    }

    return await this.categoryRepo.saveCategory(createCategoryDto);
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<void> {
    const categoryExist = await this.categoryRepo.getCategoryById(
      updateCategoryDto._id,
    );

    if (!categoryExist) {
      throw new NotFoundException(
        `Category ${updateCategoryDto.category} not exist`,
      );
    }

    return this.categoryRepo.updateCategory(updateCategoryDto);
  }

  async deleteCategory(_id: string): Promise<void> {
    const categoryExist = await this.categoryRepo.getCategoryById(_id);

    if (!categoryExist) {
      throw new NotFoundException(`Category ${_id} not exist`);
    }
    return await this.categoryRepo.deleteCategory(_id);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepo.getCategories();
  }

  async findByCategory(category: string): Promise<Category> {
    const categoryExist = await this.categoryRepo.categoryExist(category);

    if (!categoryExist) {
      throw new NotFoundException(`Category ${category} not exist`);
    }
    return await this.categoryRepo.findByCategory(category);
  }

  async addPlayerOnCategory(
    addPlayerOnCategoryDto: AddPlayerToCategoryDto,
  ): Promise<void> {
    const { category, playerId } = addPlayerOnCategoryDto;
    const playerExist = await this.playerRepo.playerExist(playerId);

    if (!playerExist) {
      throw new NotFoundException(`Player id ${playerId} not exist`);
    }

    const categoryExist = await this.categoryRepo.categoryExist(category);
    if (!categoryExist) {
      throw new NotFoundException(`Category ${category} not exist`);
    }

    const isPlayerAlreadyOnCategory = await this.categoryRepo.isPlayerAlreadyOnCategory(
      addPlayerOnCategoryDto,
    );

    if (isPlayerAlreadyOnCategory) {
      throw new ConflictException(
        `Player ${playerId} already on category ${category}`,
      );
    }

    await this.categoryRepo.addPlayerOnCategory(addPlayerOnCategoryDto);
  }
}
