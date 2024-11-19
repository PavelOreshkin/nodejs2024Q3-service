import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UUID } from 'src/database/database.types';
import { Entity, EntityNotFoundException } from 'src/utils/customExceptions';

@Injectable()
export class FavoriteService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    const {
      artists: artistsFromDb,
      albums: albumsFromDb,
      tracks: tracksFromDb,
    } = this.databaseService;
    const {
      artists: artistIds,
      albums: albumIds,
      tracks: trackIds,
    } = this.databaseService.favorite;

    const artists = artistIds
      .map(
        (artistId) =>
          artistsFromDb.find((artist) => artist.id === artistId) || null,
      )
      .filter((item) => item);
    const albums = albumIds
      .map(
        (albumId) => albumsFromDb.find((album) => album.id === albumId) || null,
      )
      .filter((item) => item);
    const tracks = trackIds
      .map(
        (trackId) => tracksFromDb.find((track) => track.id === trackId) || null,
      )
      .filter((item) => item);

    return { artists, albums, tracks };
  }

  addTrack(id: UUID) {
    const track = this.databaseService.tracks.find((track) => track.id === id);
    if (!track) {
      throw new EntityNotFoundException(
        Entity.TRACK,
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.databaseService.favorite.tracks.push(id);
  }

  addAlbum(id: UUID) {
    const album = this.databaseService.albums.find((album) => album.id === id);
    if (!album) {
      throw new EntityNotFoundException(
        Entity.ALBUM,
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.databaseService.favorite.albums.push(id);
  }

  addArtist(id: UUID) {
    const artist = this.databaseService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) {
      throw new EntityNotFoundException(
        Entity.ARTIST,
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.databaseService.favorite.artists.push(id);
  }

  removeTrack(id: UUID) {
    const trackIndex = this.databaseService.favorite.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIndex === -1) {
      throw new EntityNotFoundException(Entity.TRACK, id);
    }

    this.databaseService.favorite.tracks.splice(trackIndex, 1);
    return;
  }

  removeAlbum(id: UUID) {
    const albumIndex = this.databaseService.favorite.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumIndex === -1) {
      throw new EntityNotFoundException(Entity.ALBUM, id);
    }

    this.databaseService.favorite.albums.splice(albumIndex, 1);
    return;
  }

  removeArtist(id: UUID) {
    const artistIndex = this.databaseService.favorite.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIndex === -1) {
      throw new EntityNotFoundException(Entity.ARTIST, id);
    }

    this.databaseService.favorite.artists.splice(artistIndex, 1);
    return;
  }
}
