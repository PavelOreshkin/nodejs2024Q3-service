import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './auth.guard';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Public()
  @UsePipes(new ValidationPipe())
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  @Public()
  @UsePipes(new ValidationPipe())
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({ errorHttpStatusCode: HttpStatus.UNAUTHORIZED }),
  )
  refreshToken(@Body() refreshDto: RefreshDto) {
    return this.authService.refreshToken(refreshDto);
  }
}
