import { AddPlayerToCategoryDto } from '../dto/add-player-to-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.schema';

export class CategoryRepositoryInterface {
  saveCategory: (createCategoryDto: CreateCategoryDto) => Promise<void>;
  updateCategory: (updateCategoryDto: UpdateCategoryDto) => Promise<void>;
  deleteCategory: (_id: string) => Promise<void>;
  getCategories: () => Promise<Category[]>;
  findByCategory: (category: string) => Promise<Category>;
  addPlayerOnCategory: (
    addPlayerOnCategoryDto: AddPlayerToCategoryDto,
  ) => Promise<void>;
  isPlayerAlreadyOnCategory: (
    addPlayerOnCategoryDto: AddPlayerToCategoryDto,
  ) => Promise<boolean>;
}
