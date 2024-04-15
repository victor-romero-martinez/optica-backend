import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category created.',
    type: Category,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Find all categories.' })
  @ApiResponse({
    status: 200,
    description: 'All categories.',
    type: [Category],
  })
  @ApiQuery({
    name: 'products',
    required: false,
    description: '1 for true, false other values.',
  })
  @Get()
  findAll(@Query('products') products: string) {
    return this.categoriesService.findAll(+products);
  }

  @ApiOperation({ summary: 'Get a category by id.' })
  @ApiResponse({
    status: 200,
    description: 'A category.',
    type: Category,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.categoriesService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update a category.' })
  @ApiResponse({
    status: 200,
    description: 'Category updated.',
  })
  @ApiBody({ type: Category })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return this.categoriesService.update(+id, updateCategoryDto);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Remove a category.' })
  @ApiResponse({
    status: 200,
    description: 'Operation message.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.categoriesService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
