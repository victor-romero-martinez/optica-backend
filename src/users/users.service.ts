import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} couldn't found.`);
    }
    return user;
  }

  async update(emailReq: string, id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user.email !== emailReq) {
      throw new UnauthorizedException();
    }
    const updated = this.userRepo.merge(user, updateUserDto);
    return await this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.delete({ id });
    if (user.affected === 0) {
      return new NotFoundException(`User #${id} couldn't found.`);
    }
    return { message: `Deleted successfully #${id}` };
  }
}
