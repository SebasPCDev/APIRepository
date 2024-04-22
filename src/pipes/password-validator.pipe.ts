import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../modules/Users/dto/create-user.dto';

@Injectable()
export class PasswordValidator implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateUserDto, metadada: ArgumentMetadata) {
    const { password, confirmpassword } = value;
    if (password !== confirmpassword) {
      throw new BadRequestException('Passwords do not match');
    } else if (!password || !confirmpassword) {
      throw new BadRequestException('Missing credentials');
    }

    return delete value.confirmpassword, value;
  }
}
