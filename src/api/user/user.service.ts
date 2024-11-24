import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { hashSync, compareSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { UUID } from 'src/utils/types';
import { Entity, EntityNotFoundException } from 'src/utils/customExceptions';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = hashSync(createUserDto.password, 8);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    return instanceToPlain(savedUser);
  }

  findAll() {
    return instanceToPlain(this.userRepository.find());
  }

  async findOne(id: UUID) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityNotFoundException(Entity.USER, id);
    return instanceToPlain(user);
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new EntityNotFoundException(Entity.USER, id);

    const isSamePassword = compareSync(oldPassword, user.password);
    if (!isSamePassword) {
      throw new ForbiddenException('Wrong old password');
    }
    if (oldPassword === newPassword) {
      throw new BadRequestException('Passwords should not be the same');
    }

    const hashedPassword = hashSync(newPassword, 8);

    Object.assign(user, { password: hashedPassword });

    const updatedUser = await this.userRepository.save(user);
    return instanceToPlain(updatedUser);
  }

  async remove(id: UUID) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityNotFoundException(Entity.USER, id);
    await this.userRepository.remove(user);
    return;
  }
}
