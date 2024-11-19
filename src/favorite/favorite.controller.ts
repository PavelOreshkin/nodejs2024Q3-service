import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { UUID } from 'src/utils/types';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe())
  addTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoriteService.addTrack(id);
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe())
  addAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoriteService.addAlbum(id);
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe())
  addArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoriteService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoriteService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoriteService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoriteService.removeArtist(id);
  }
}
