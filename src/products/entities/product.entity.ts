import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ default: 0 })
  stock: number;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  characteristics: string[];

  @ApiProperty()
  @Column('simple-array')
  images: string[];

  @ApiProperty()
  @Column('simple-json')
  prices: {
    price: number;
    discount: number;
    currency: string;
  };

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId: number;

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: typeof Category;
}
