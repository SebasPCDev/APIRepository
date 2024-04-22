import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { UsersDbService } from './userdb.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeletePassAdminInterceptor } from '../../Interceptor/deletePassAdmin.interceptor';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../Auth/enum/roles.enum';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(DeletePassAdminInterceptor)
export class UsersController {
  constructor(private readonly userDbService: UsersDbService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getUsers() {
    return this.userDbService.getAllUsers();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDbService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userDbService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  deleteUser(@Param('id') id: string) {
    return this.userDbService.deleteUser(id);
  }
}
