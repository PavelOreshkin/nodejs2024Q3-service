import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Track } from 'src/api/track/entities/track.entity';
import { Artist } from 'src/api/artist/entities/artist.entity';
import { Album } from 'src/api/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Artist, Album, Track])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
