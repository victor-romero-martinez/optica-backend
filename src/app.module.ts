import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { Brand } from './brands/entities/brand.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { Constants } from './constants';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { RolesGuard } from './roles/roles.guard';
import { Style } from './styles/entities/style.entity';
import { StylesModule } from './styles/styles.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Constants.PGHOST,
      database: Constants.PGDATABASE,
      username: Constants.PGUSER,
      password: Constants.PGPASSWORD,
      port: +Constants.PORT,
      ssl: !!Constants.SSL,
      synchronize: true,
      entities: [Product, Category, User, Style, Brand],
    }),
    ProductsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    BrandsModule,
    StylesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
