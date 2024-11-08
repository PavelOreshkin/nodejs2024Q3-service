import { UUID } from 'src/database/database.types';

export class Album {
  id: UUID; // uuid v4
  name: string;
  year: number;
  artistId: UUID | null; // refers to Artist

  constructor({
    id,
    name,
    year,
    artistId,
  }: {
    id: UUID;
    name: string;
    year: number;
    artistId: UUID | null;
  }) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
