import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({ ...AppDataSource.options }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
