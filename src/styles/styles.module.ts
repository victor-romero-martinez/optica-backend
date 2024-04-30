import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Style } from './entities/style.entity';
import { StylesController } from './styles.controller';
import { StylesService } from './styles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Style])],
  controllers: [StylesController],
  providers: [StylesService],
})
export class StylesModule {}
