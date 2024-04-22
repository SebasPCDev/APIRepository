import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../Users/user.repository';
import { CreateUserDto, LoginUserDto } from '../Users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt';
import { Role } from './enum/roles.enum';

export type Auth = {
  email: string;
  password: string;
};
@Injectable()
export class AuthRepository {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly JwtService: JwtService,
  ) {}

  async signup(user: Omit<CreateUserDto, 'confirmpassword'>) {
    const dbUser = await this.userRepository.getUserByEmail(
      user.email.toLowerCase(),
    );
    if (dbUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
      email: user.email.toLowerCase(),
    });

    return newUser;
  }

  async signin(credentials: LoginUserDto) {
    const user = await this.userRepository.getUserByEmail(
      credentials.email.toLowerCase(),
    );

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const userPayload = {
      sub: user.id,
      id: user.id,
      username: credentials.email.toLowerCase(),
      role: [user.admin ? Role.Admin : Role.User],
    };
    const token = this.JwtService.sign(userPayload);

    return { success: 'Login successful', token: token };
  }
}
