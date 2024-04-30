import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product.' })
  @ApiResponse({
    status: 201,
    description: 'New product created.',
    type: Product,
  })
  @Post()
  @Roles(Role.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products.' })
  @ApiResponse({
    status: 200,
    description: 'List of products.',
    type: [Product],
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get()
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const take = limit ?? '10';
    const skip = offset ?? '0';
    const result = await this.productsService.findAll(+take, +skip);
    return {
      ...result,
      limit: +take,
      offset: result.product.length,
    };
  }

  @ApiOperation({ summary: 'Get product by category id.' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get('/category')
  async findByCategoryId(
    @Query('id') id: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    if (!id) {
      return new NotFoundException(`Category #${id} was not found.`);
    }
    const take = limit ?? '10';
    const skip = offset ?? '0';
    const result = await this.productsService.findByCategoryId(
      +id,
      +take,
      +skip,
    );
    return {
      result,
      limit: +take,
      offset: result.categoryFounded.length,
    };
  }

  @ApiOperation({ summary: 'Get a product by id.' })
  @ApiResponse({
    status: 200,
    description: 'One product.',
    type: Product,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productsService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product.' })
  @ApiResponse({
    status: 200,
    description: 'Product updated.',
    type: Product,
  })
  @ApiBody({ type: Product })
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.update(+id, updateProductDto);
    } catch (error) {
      return error;
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a product.' })
  @ApiResponse({
    status: 200,
    description: 'Operation result.',
    schema: {
      example: {
        message: 'string',
      },
    },
  })
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
