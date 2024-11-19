import { v4 as uuid } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { UUID } from 'src/database/database.types';
import { Entity, EntityNotFoundException } from 'src/utils/customExceptions';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly logger = new Logger(); // TODO удалить

  create(createUserDto: CreateUserDto) {
    const user = new User({
      id: uuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date().valueOf(),
      updatedAt: new Date().valueOf(),
    });
    this.databaseService.users.push(user);
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findAll() {
    return this.databaseService.users.map((user) => {
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  findOne(id: UUID) {
    const user = this.databaseService.users.find((user) => user.id === id);
    if (!user) {
      throw new EntityNotFoundException(Entity.USER, id);
    }
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    const userIndex = this.databaseService.users.findIndex(
      (user) => user.id === id,
    );
    const user = this.databaseService.users[userIndex];

    if (!user) {
      throw new EntityNotFoundException(Entity.USER, id);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    if (updateUserDto.oldPassword === updateUserDto.newPassword) {
      throw new BadRequestException('Passwords should not be the same');
    }

    const updatedUser: User = {
      ...user,
      version: user.version + 1,
      updatedAt: new Date().valueOf(),
      password: updateUserDto.newPassword,
    };

    this.databaseService.users.splice(userIndex, 1, updatedUser);
    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  remove(id: UUID) {
    const userIndex = this.databaseService.users.findIndex(
      (user) => user.id === id,
    );

    if (userIndex === -1) {
      throw new EntityNotFoundException(Entity.USER, id);
    }

    this.databaseService.users.splice(userIndex, 1);
    return;
  }
}
