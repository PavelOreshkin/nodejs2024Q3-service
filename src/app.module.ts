import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { ArtistModule } from './api/artist/artist.module';
import { AlbumModule } from './api/album/album.module';
import { TrackModule } from './api/track/track.module';
import { FavoriteModule } from './api/favorite/favorite.module';
import { AppDataSource } from './db/data-source';
import { CustomLogger } from './logger/CustomLogger';
import { LoggingMiddleware } from './logger/LoggingMiddleware';

@Module({
  imports: [
    AuthModule,
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
  providers: [CustomLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
