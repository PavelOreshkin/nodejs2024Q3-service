import { UUID } from 'src/database/database.types';

export class Artist {
  id: UUID; // uuid v4
  name: string;
  grammy: boolean;

  constructor({
    id,
    name,
    grammy,
  }: {
    id: UUID;
    name: string;
    grammy: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
