import { DataSource } from 'typeorm';
import { User } from '../api/user/entities/user.entity';
import { Artist } from '../api/artist/entities/artist.entity';
import { Album } from '../api/album/entities/album.entity';
import { Track } from '../api/track/entities/track.entity';
import { Favorite } from '../api/favorite/entities/favorite.entity';
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

export const initDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
};
