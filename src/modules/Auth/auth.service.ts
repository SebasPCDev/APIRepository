import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto, LoginUserDto } from '../Users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  signup(user: Omit<CreateUserDto, 'confirmpassword'>) {
    return this.authRepository.signup(user);
  }

  signin(credentials: LoginUserDto) {
    return this.authRepository.signin(credentials);
  }

  //-------------------------------------------------------

  /*   getAuth() {
    return 'get all auths';
  }

  login(credentials: Auth) {
    return this.authRepository.login(credentials);
  } */
}
