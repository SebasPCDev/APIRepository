import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MinSizeValidatorPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: Express.Multer.File, metadada: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('File is required');
    }
    const minSize = 80000;
    if (value.size < minSize) {
      throw new BadRequestException(
        `File size is too small. Minimum size is ${minSize} bytes`,
      );
    }
    return value;
  }
}
