import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../Entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAdminDto, UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: Omit<CreateUserDto, 'confirmpassword'>) {
    return await this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      return { message: 'User not found' };
    }

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    if (user.email) {
      const userTemp = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (userTemp) {
        return { message: 'Email already exists' };
      } else {
        user.email = user.email.toLowerCase();
      }
    }

    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) {
      return { message: 'User not found' };
    }

    return user;
  }

  async deleteUser(idToDelete: string, userIdRequest: string) {
    const userToDelete = await this.userRepository.findOne({
      where: { id: idToDelete },
    });
    const userRequested = await this.userRepository.findOne({
      where: { id: userIdRequest },
    });
    //superadmin permissions
    if (userRequested.role === 'superadmin') {
      if (!userToDelete) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.delete(idToDelete);
      return { message: `User ${userToDelete.name} deleted` };
    }
    //admin permissions
    if (
      userRequested.role === 'admin' &&
      (userToDelete.role === 'admin' || userToDelete.role === 'superadmin')
    ) {
      throw new BadRequestException(
        'Superadmin and Admin cannot be deleted by Admin',
      );
    }

    if (userToDelete.role === 'user') {
      if (!userToDelete) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.delete(idToDelete);
      return { message: `User ${userToDelete.name} deleted` };
    }
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateRole(id: string, user: UpdateUserAdminDto) {
    const userFind = await this.userRepository.findOne({ where: { id } });
    if (!userFind) {
      return { message: 'User not found' };
    }

    if (user.role === 'user' || user.role === 'admin') {
      await this.userRepository.update(id, user);
      return await this.userRepository.findOne({ where: { id } });
    }
  }

  async preloadAdminUser() {
    const hashedPassword = await bcrypt.hash('Sebas123!', 10);
    const adminUser = {
      name: 'Admin',
      email: 'sebpa.16@gmail.com',
      password: hashedPassword,
      address: '123 Main St',
      phone: 1234567,
      country: 'USA',
      city: 'New York',
      role: 'superadmin',
    };

    console.log('Loading database...');

    const userTemp = await this.userRepository.findOne({
      where: { email: adminUser.email },
    });

    if (!userTemp) {
      console.log('Admin user has been created...');
      return await this.userRepository.save(adminUser);
    }
    console.log('Admin user already exists...');
  }

  //* Implementación de CRUD con Base de datos en memoria
  /* 
  export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};
  
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password1',
      address: '123 Main St',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password2',
      address: '456 Main St',
      phone: '123-456-7891',
      country: 'USA',
      city: 'Los Angeles',
    },
    {
      id: 3,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      password: 'password3',
      address: '789 Main St',
      phone: '123-456-7892',
      country: 'USA',
      city: 'Chicago',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'password4',
      address: '1011 Main St',
      phone: '123-456-7893',
      country: 'USA',
      city: 'Houston',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      password: 'password5',
      address: '1213 Main St',
      phone: '123-456-7894',
      country: 'USA',
      city: 'Phoenix',
    },
  ];

  getUsers() {
    return this.users;
  }
  getUserByIdM(id: number) {
    const findUser = this.users.find((user) => user.id === id);
    if (findUser) {
      const { password, ...userNoPassword } = findUser;
      return userNoPassword;
    }
    {
      return { message: 'User not found' };
    }
  }

  createUser(user: User) {
    const findMaxId = this.users.reduce((acc, user) => {
      return user.id > acc ? user.id : acc;
    }, 0);
    const id = findMaxId + 1;
    user.id = id;
    this.users.push(user);
    return { id, ...user };
  }

  updateUserM(id: number, user: User) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  deleteUserM(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return this.users;
  } */
}
