import { UUID } from 'src/database/database.types';

export class Favorite {
  artists: UUID[];
  albums: UUID[];
  tracks: UUID[];

  constructor({
    artists,
    albums,
    tracks,
  }: {
    artists: UUID[];
    albums: UUID[];
    tracks: UUID[];
  }) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
