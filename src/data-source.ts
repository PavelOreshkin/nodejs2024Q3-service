import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env || {};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Artist, Album, Track, Favorite],
  migrations: ['./dist/migrations/*.js'],
  migrationsTableName: 'migration_table',
  synchronize: false,
  logging: true,
});
