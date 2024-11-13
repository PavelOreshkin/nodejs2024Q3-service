import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { User } from './user/entities/user.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { Favorite } from './favorite/entities/favorite.entity';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
    // TODO move TypeOrmModule to global config
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'qwe',
      username: 'postgres',
      entities: [User, Artist, Album, Track, Favorite],
      // migrations: ['./src/migrations/*.ts'],
      database: 'postgres',
      synchronize: true, // TODO переключить на false
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
