import { UUID } from 'src/database/database.types';

export class Track {
  id: UUID; // uuid v4
  name: string;
  artistId: UUID | null; // refers to Artist
  albumId: UUID | null; // refers to Album
  duration: number; // integer number

  constructor({
    id,
    name,
    artistId,
    albumId,
    duration,
  }: {
    id: UUID;
    name: string;
    artistId: UUID | null;
    albumId: UUID | null;
    duration: number;
  }) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
