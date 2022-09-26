import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private _prismaService: PrismaService) {}

  getAllProducts(): Promise<Product[]> {
    return this._prismaService.product.findMany();
  }

  saveProduct(product: ProductDto): Promise<Product> {
    return this._prismaService.product.create({
      data: product,
    });
  }

  updateProduct(productId: string, product: ProductDto): Promise<Product> {
    return this._prismaService.product.update({
      data: product,
      where: {
        id: productId,
      },
    });
  }

  deleteProduct(producId: string): Promise<Product> {
    return this._prismaService.product.delete({
      where: {
        id: producId,
      },
    });
  }
}
