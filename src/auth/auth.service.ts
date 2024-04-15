import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /** get session */
  async singIn({ email, password }: AuthDto) {
    const user = await this.userRepo.findOneBy({ email });

    if (!user || user.password !== password) {
      return new UnauthorizedException();
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    return { token };
  }

  /** register a user */
  async register(registerDto: AuthDto) {
    const userIsAlready = await this.userRepo.findOneBy({
      email: registerDto.email,
    });
    if (userIsAlready) {
      throw new ConflictException('Email is already exist.');
    }
    const newUser = this.userRepo.create(registerDto);
    const createdUser = await this.userRepo.save(newUser);
    const token = await this.jwtService.signAsync({
      sub: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
    });
    return { token };
  }
}
