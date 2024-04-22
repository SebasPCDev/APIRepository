import { Injectable } from '@nestjs/common';

import { CloudinaryService } from './upload-files.repository';

@Injectable()
export class UploadFilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  uploadImage(id: string, file: Express.Multer.File) {
    return this.cloudinaryService.updateImage(id, file);
  }
}
