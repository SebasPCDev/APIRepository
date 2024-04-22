import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../Entities/user.entity';
import { UsersDbService } from './userdb.service';

@Module({
  providers: [UserRepository, UsersDbService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {
  constructor(private readonly userDbService: UsersDbService) {}

  async onModuleInit() {
    await this.userDbService.preloadAdminUser();
  }
}
