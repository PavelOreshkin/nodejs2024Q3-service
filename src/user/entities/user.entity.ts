import { UUID } from 'src/database/database.types';

export class User {
  id: UUID; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor({
    id,
    login,
    password,
    version,
    createdAt,
    updatedAt,
  }: {
    id: UUID;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
  }) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
