import { Module } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { UploadFilesController } from './upload-files.controller';
import { CloudinaryService } from './upload-files.repository';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../Entities/product.entity';
import { Category } from '../../Entities/category.entity';

@Module({
  controllers: [UploadFilesController],
  providers: [UploadFilesService, CloudinaryConfig, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Product, Category])],
})
export class UploadFilesModule {}
