import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomParamPipe } from '../common/pipes/custom-param.pipe';
import { CategoryService } from './category.service';
import { AddPlayerToCategoryDto } from './dto/add-player-to-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.schema';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(
    @Inject(CategoryService)
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @UsePipes(CreateCategoryDto)
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<void> {
    return this.categoryService.saveCategory(createCategoryDto);
  }

  @Get()
  getCategories(): Promise<Array<Category>> {
    return this.categoryService.getCategories();
  }

  @Get('/:category')
  getCategoryById(@Param(CustomParamPipe) category: string): Promise<Category> {
    return this.categoryService.findByCategory(category);
  }

  @Put('/:_id')
  updateCategory(
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
    @Param(CustomParamPipe) _id: string,
  ): Promise<void> {
    updateCategoryDto._id = _id;
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Delete('/:_id')
  deleteCategory(@Param(CustomParamPipe) _id: string): Promise<void> {
    return this.categoryService.deleteCategory(_id);
  }

  @Patch('/:category/:playerId')
  addPlayerToCategory(
    @Param() addPlayerToCategoryDto: AddPlayerToCategoryDto,
  ): Promise<void> {
    return this.categoryService.addPlayerOnCategory(addPlayerToCategoryDto);
  }
}
