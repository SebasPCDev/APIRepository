import { Test, TestingModule } from '@nestjs/testing';
import { UploadFilesService } from './upload-files.service';
import { CloudinaryService } from './upload-files.repository';

describe('UploadFilesService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const mockCloudinaryService: Partial<CloudinaryService> = {
      uploadImage: () => Promise.resolve({} as any),
      updateImage: () => Promise.resolve({} as any),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadFilesService,
        { provide: CloudinaryService, useValue: { mockCloudinaryService } },
      ],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload an image', async () => {
    const image = await service.updateImage('id', { buffer: 'buffer' } as any);
    expect(image).toEqual({
      mensaje: 'La imagen se actualizó correctamente',
      newUrl: 'url',
    });
  });
});
