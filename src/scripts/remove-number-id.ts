import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { ProductsRepository } from '../../src/products/products.repository';
import { AppModule } from '../../src/app.module';

async function removeNumberIdScript() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsRepository = app.get(ProductsRepository);
  const configService = app.get(ConfigService);
  const logger = new Logger('RemoveNumberIdScript');

  try {
    const model = (productsRepository as any).productModel as Model<any>;

    const result = await model.updateMany(
      {},
      { $unset: { id: 1 } }
    );

    logger.log(`Successfully removed the 'id' number field from ${result.modifiedCount} products.`);
  } catch (error) {
    logger.error('Error removing the "id" number field:', error);
  } finally {
    await app.close();
  }
}

removeNumberIdScript();
