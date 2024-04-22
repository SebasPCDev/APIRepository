import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../Users/dto/create-user.dto';
import { PasswordValidator } from '../../pipes/password-validator.pipe';
import { DeletePassAdminInterceptor } from '../../Interceptor/deletePassAdmin.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //---------------------------------------------

  @Post('/signin')
  @HttpCode(200)
  signin(@Body() credentials: LoginUserDto) {
    return this.authService.signin(credentials);
  }

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(new PasswordValidator())
  @UseInterceptors(new DeletePassAdminInterceptor())
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.authService.signup(createUserDto);
  }
}
