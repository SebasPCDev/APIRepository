/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../modules/Users/user.repository';
import { User } from '../Entities/user.entity';
import { AuthRepository } from '../modules/Auth/auth.repository';
import { CreateUserDto } from 'src/modules/Users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let mockUserRepository: Partial<UserRepository>;

  const mockUser: Omit<CreateUserDto, 'confirmpassword'> = {
    name: 'John Doe',
    email: 'example@mail.com',
    password: 'StrongPassword123!',
    phone: 123456,
    address: '123 Main St',
    country: 'USA',
    city: 'Springfield',
    admin: false,
  };

  beforeEach(async () => {
    mockUserRepository = {
      getUserByEmail: () => Promise.resolve(undefined),
      createUser: (user: Omit<User, 'confirmpassword'>): Promise<User> =>
        Promise.resolve({
          ...user,
          admin: false,
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        }),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthRepository,
        JwtService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  it('Create an instance of AuthRepository', async () => {
    expect(authRepository).toBeDefined();
  });

  it('Should create a new user', async () => {
    const user = await authRepository.signup(mockUser);
    expect(user).toBeDefined();
  });

  it('Return an error if the user already exists', async () => {
    mockUserRepository.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);
    try {
      await authRepository.signup(mockUser as User);
    } catch (error) {
      expect(error.message).toBe('Email already exists');
    }
  });

  it('signIn returns an error if the password is invalid', async () => {
    mockUserRepository.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);
    try {
      await authRepository.signin(mockUser);
    } catch (error) {
      expect(error.message).toEqual('Invalid credentials');
    }
  });

  it('signIn returns a token if the password is valid', async () => {
    mockUserRepository.getUserByEmail = (email: string) =>
      Promise.resolve({
        ...mockUser,
        password:
          '$2b$10$0Zm3b7Y7zV6QO8w0KZz6UOQZg1y4n3hjLZ9B4zQ3aYJ1JQ9Y5n5Oa',
      } as User);
    const token = await authRepository.signin(mockUser);
    expect(token).toBeDefined();
  });
});
