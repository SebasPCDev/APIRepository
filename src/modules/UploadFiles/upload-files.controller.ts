import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeValidatorPipe } from '../../pipes/min-size-validator.pipe';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../Auth/enum/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Upload Files')
@Controller('files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @ApiBearerAuth()
  @Post('/uploadImage/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file', { limits: { files: 1 } }))
  create(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      MinSizeValidatorPipe,
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
          new MaxFileSizeValidator({
            maxSize: 200000, // 200kB
            message: `File too large. Max size is 200kB`,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadFilesService.uploadImage(id, file);
  }
}
