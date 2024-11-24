import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshDto } from './dto/refresh.dto';

const {
  JWT_SECRET_KEY,
  TOKEN_EXPIRE_TIME,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_REFRESH_EXPIRE_TIME,
} = process.env;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) {
      throw new ForbiddenException('No user with such login');
    }
    const isSamePassword = await compareSync(password, user.password);
    if (!isSamePassword) {
      throw new ForbiddenException("Password doesn't match actual one");
    }
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: await this.generateAccessToken(payload),
      refreshToken: await this.generateRefreshToken(payload),
    };
  }

  async refreshToken(refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;

    try {
      const verifyResult = await this.jwtService.verifyAsync(refreshToken, {
        secret: JWT_SECRET_REFRESH_KEY,
      });

      const { userId, login } = verifyResult;
      return {
        accessToken: await this.generateAccessToken({ userId, login }),
        refreshToken: await this.generateRefreshToken({ userId, login }),
      };
    } catch (error) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }

  private generateAccessToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: TOKEN_EXPIRE_TIME,
    });
  }

  private generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET_REFRESH_KEY,
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });
  }
}
