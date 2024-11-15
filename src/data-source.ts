import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { Favorite } from './favorite/entities/favorite.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwe',
  database: 'postgres',
  entities: [User, Artist, Album, Track, Favorite],
  migrations: ['./dist/migrations/*.js'],
  migrationsTableName: 'migration_table',
  synchronize: false,
  logging: true,
});
