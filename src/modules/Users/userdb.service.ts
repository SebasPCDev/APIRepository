import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAdminDto, UpdateUserDto } from './dto/update-user.dto';
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

  updateRole(id: string, user: UpdateUserAdminDto) {
    return this.userRepository.updateRole(id, user);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  deleteUser(idToDelete: string, userIdRequest: string) {
    return this.userRepository.deleteUser(idToDelete, userIdRequest);
  }

  preloadAdminUser() {
    return this.userRepository.preloadAdminUser();
  }
}
