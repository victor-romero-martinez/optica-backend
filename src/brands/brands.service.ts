import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly branRepo: Repository<Brand>,
  ) {}

  /** create a new brand */
  async create(createBrandDto: CreateBrandDto) {
    const newBrand = this.branRepo.create(createBrandDto);
    return await this.branRepo.save(newBrand);
  }

  /** find all brands */
  async findAll() {
    return await this.branRepo.find({ order: { id: 'ASC' } });
  }

  /** find a brand by id */
  async findOne(id: number) {
    const brand = await this.branRepo.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} can't find.`);
    }

    return brand;
  }

  /** update a brand */
  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOne(id);
    Object.assign(brand, updateBrandDto);
    return await this.branRepo.save(brand);
  }

  /** delete á brand by id */
  async remove(id: number) {
    const res = await this.branRepo.delete({ id });
    if (res.affected === 0) {
      throw new NotFoundException(`Brand #${id} can't find.`);
    }
    return { message: `Successfully removes a #${id} brand.` };
  }
}
