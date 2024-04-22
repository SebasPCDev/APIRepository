import { Module } from '@nestjs/common';
//import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../Users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../Entities/user.entity';
import { Order } from '../../Entities/order.entity';
import { UsersDbService } from '../Users/userdb.service';

@Module({
  providers: [AuthService, AuthRepository, UserRepository, UsersDbService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Order])],
})
export class AuthModule {}
