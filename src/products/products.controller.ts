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
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product.' })
  @ApiResponse({
    status: 201,
    description: 'New product created.',
    type: Product,
  })
  @Post()
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
    return { result, limit: +take, offset: result.length };
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

    return { result, limit: +take, offset: result.length };
  }

  @ApiOperation({ summary: 'Get a product by id.' })
  @ApiResponse({
    status: 200,
    description: 'One product.',
    type: Product,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a product.' })
  @ApiResponse({
    status: 200,
    description: 'Product updated.',
    type: Product,
  })
  @ApiBody({ type: Product })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remove a product.' })
  @ApiResponse({
    status: 200,
    description: 'Operation result.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
