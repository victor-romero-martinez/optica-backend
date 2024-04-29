import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  /** create a new product */
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return await this.productRepo.save(product);
  }

  /** get all products */
  async findAll(take: number, skip: number) {
    const [product, count] = await this.productRepo.findAndCount({
      take,
      skip,
      relations: {
        style: true,
        // @ts-expect-error: Should expect FindOptionsRelations<Brand>
        brand: true,
        // @ts-expect-error: Should expect FindOptionsRelations<Category>
        category: true,
      },
      select: {
        id: true,
        name: true,
        images: true,
        prices: {
          price: true,
          discount: true,
          currency: true,
        },
        style: {
          id: true,
          name: true,
        },
        // @ts-expect-error: Should expect FindOptionsSelect<Brand>
        brand: {
          id: true,
          name: true,
        },
        // @ts-expect-error: Should expect FindOptionsSelect<Category>
        category: {
          id: true,
          name: true,
        },
      },
    });

    return { product, total: count };
  }

  /** find a product */
  async findOne(id: number, includeRelations = true) {
    const productFounded = await this.productRepo.findOne({
      where: {
        id,
      },
      relations: {
        // @ts-expect-error: Should expect FindOptionsRelations<Category>
        category: includeRelations,
      },
      select: {
        // @ts-expect-error: Should expect FindOptionsSelect<Category>
        category: {
          name: true,
        },
      },
    });

    if (!productFounded) {
      throw new NotFoundException(`Product #${id} was not found.`);
    }

    return productFounded;
  }

  /** find by category id */
  async findByCategoryId(id: number, take: number, skip: number) {
    const categoryFounded = await this.productRepo.find({
      where: {
        categoryId: id,
      },
      take,
      skip,
    });

    return categoryFounded;
  }

  /** update a product */
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id, false);
    Object.assign(product, updateProductDto);
    return await this.productRepo.save(product);
  }

  /** delete a product */
  async remove(id: number) {
    const isDeleted = await this.productRepo.delete(id);
    if (isDeleted.affected === 0) {
      throw new NotFoundException(`Product #${id} was not found.`);
    }
    return { message: `Product removed #${id} successfully.` };
  }
}
