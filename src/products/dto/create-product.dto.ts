import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Price {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  discount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  stock: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  characteristics: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Price)
  prices: Price;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  categoryId: number;
}
