export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor({
    id,
    name,
    artistId,
    albumId,
    duration,
  }: {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
