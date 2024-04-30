import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';

@Injectable()
export class StylesService {
  constructor(
    @InjectRepository(Style)
    private readonly styleRepo: Repository<Style>,
  ) {}

  /** create new style */
  async create(createStyleDto: CreateStyleDto) {
    const style = this.styleRepo.create(createStyleDto);
    return await this.styleRepo.save(style);
  }

  /** find all styles */
  async findAll() {
    return await this.styleRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const style = await this.styleRepo.findOneBy({ id });
    if (!style) {
      throw new NotFoundException(`Style ${id} not found.`);
    }
    return style;
  }

  /** update style */
  async update(id: number, updateStyleDto: UpdateStyleDto) {
    const updated = await this.styleRepo.update({ id }, updateStyleDto);
    if (updated.affected === 0) {
      throw new NotFoundException(`Failed update id: ${id} isn't found.`);
    }
    return await this.findOne(id);
  }

  async remove(id: number) {
    const deleted = await this.styleRepo.delete({ id });
    if (deleted.affected === 0) {
      throw new NotFoundException(`Error removes style id: ${id}.`);
    }
    return { message: `Successfully removes a #${id} style` };
  }
}
