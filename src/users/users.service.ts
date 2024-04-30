import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const responseSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  updatedAt: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepo.find({ select: responseSelect });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: responseSelect,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} couldn't found.`);
    }
    return user;
  }

  async update(emailReq: string, id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (user.email !== emailReq) {
      throw new UnauthorizedException();
    }
    // [TODO] tabien validar por contraseña
    const updated = this.userRepo.merge(user, updateUserDto);
    return await this.userRepo.save(updated);
  }

  async remove(idReq: number, id: number) {
    const userTarget = await this.findOne(id);
    if (userTarget.id !== idReq) {
      throw new UnauthorizedException();
    }
    const userDeleted = await this.userRepo.delete({ id });
    if (userDeleted.affected === 0) {
      return new NotFoundException(`User #${id} couldn't found.`);
    }
    return { message: `Deleted successfully`, user: userTarget };
  }
}
