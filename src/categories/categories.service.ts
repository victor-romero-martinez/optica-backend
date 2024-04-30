import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  /** create a new category */
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(category);
  }

  /** get all categories */
  async findAll(products: number) {
    const showRelations = products === 1 ? true : false;
    return await this.categoryRepo.find({
      relations: { products: showRelations },
      order: { id: 'ASC' },
      select: {
        products: {
          id: true,
          name: true,
          description: true,
          characteristics: true,
          prices: { price: true, discount: true, currency: true },
          images: true,
        },
      },
    });
  }

  /** get a category by id*/
  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true },
      select: {
        products: {
          id: true,
          name: true,
          description: true,
          characteristics: true,
          prices: { price: true, discount: true, currency: true },
          images: true,
        },
      },
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} was not found.`);
    }
    return category;
  }

  /** update a category */
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updated = await this.categoryRepo.update({ id }, updateCategoryDto);
    if (updated.affected === 0) {
      throw new NotFoundException(`Category #${id} failed update.`);
    }

    return await this.findOne(id);
  }

  /** delete a category */
  async remove(id: number) {
    const deleted = await this.categoryRepo.delete({ id });
    if (deleted.affected === 0) {
      throw new NotFoundException(`Category #${id} was not found.`);
    }
    return { message: `Successfully removes a #${id} category` };
  }
}
