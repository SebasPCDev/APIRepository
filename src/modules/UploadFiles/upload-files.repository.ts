import { UploadApiResponse, v2 } from 'cloudinary';

import * as toStream from 'buffer-to-stream';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../Entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async updateImage(id: string, file: Express.Multer.File) {
    const response = await this.uploadImage(file);
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      return new NotFoundException({ message: 'El producto no existe' });
    }
    try {
      await this.productRepository.update(id, {
        image: response.url,
      });
      return {
        mensaje: 'La imagen se actualizó correctamente',
        newUrl: response.url,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          mensaje: `Hubo un error al actualizar la imagen: ${error.message}`,
        };
      } else {
        return { mensaje: 'Hubo un error desconocido al actualizar la imagen' };
      }
    }
  }
}
