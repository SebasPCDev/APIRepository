import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersDbService {
  constructor(private userRepository: UserRepository) {}

  create(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  getAllUsers() {
    return this.userRepository.findAll();
  }

  updateUser(id: string, user: UpdateUserDto) {
    return this.userRepository.updateUser(id, user);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }

  preloadAdminUser() {
    return this.userRepository.preloadAdminUser();
  }
}
