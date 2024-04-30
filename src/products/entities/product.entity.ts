import { ApiProperty } from '@nestjs/swagger';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Style } from 'src/styles/entities/style.entity';
import {
  Column,
  CreateDateColumn,
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
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId: number;

  @ApiProperty()
  @Column({ name: 'brand_id' })
  brandId: number;

  @ApiProperty()
  @Column({ name: 'style_id' })
  styleId: number;

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: typeof Category;

  @ApiProperty()
  @ManyToOne(() => Brand, (brand) => brand.products, { cascade: true })
  @JoinColumn({ name: 'brand_id' })
  brand: typeof Brand;

  @ApiProperty()
  @ManyToOne(() => Style, (style) => style.products, { cascade: true })
  @JoinColumn({ name: 'style_id' })
  style: Style;
}
