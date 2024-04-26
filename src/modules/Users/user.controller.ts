import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { UsersDbService } from './userdb.service';
import { UpdateUserAdminDto, UpdateUserDto } from './dto/update-user.dto';
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
  @Roles(Role.Admin, Role.Superadmin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getUsers() {
    return this.userDbService.getAllUsers();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin, Role.User, Role.Superadmin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDbService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put('/superadmin/:id')
  @Roles(Role.Superadmin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  updateAdminRole(
    @Param('id') id: string,
    @Body() updateRole: UpdateUserAdminDto,
  ) {
    return this.userDbService.updateRole(id, updateRole);
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
  @Roles(Role.Admin, Role.Superadmin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  deleteUser(@Param('id') idToDelete: string, @Request() req: any) {
    return this.userDbService.deleteUser(idToDelete, req.user.id);
  }
}
