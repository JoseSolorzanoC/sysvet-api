import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { Auth } from '../auth/decorator';
import { Role } from '../enums';
import { ProductDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Auth(Role.admin, Role.doctor)
  @Get('all')
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Auth(Role.admin, Role.doctor)
  @Post('new')
  saveProduct(@Body() dto: ProductDto): Promise<Product> {
    return this.productsService.saveProduct(dto);
  }

  @Auth(Role.admin, Role.doctor)
  @Put('update/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body() dto: ProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(productId, dto);
  }

  @Auth(Role.admin, Role.doctor)
  @Delete('delete/:id')
  deleteProduct(@Param('id') productId: string): Promise<Product> {
    return this.productsService.deleteProduct(productId);
  }
}
