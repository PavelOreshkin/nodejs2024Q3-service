import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'src/utils/types';
import { Entity, EntityNotFoundException } from 'src/utils/customExceptions';
import { Favorite } from './entities/favorite.entity';
import { In, Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    // this.favoriteRepository.save({ artists: [], albums: [], tracks: [] });
    const favorite = await this.favoriteRepository.findOne({
      where: { id: 'favorite-singleton-id' },
    });

    const artists = await this.artistRepository.findBy({
      id: In(favorite.artists),
    });

    const albums = await this.albumRepository.findBy({
      id: In(favorite.albums),
    });

    const tracks = await this.trackRepository.findBy({
      id: In(favorite.tracks),
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: UUID) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new EntityNotFoundException(
        Entity.TRACK,
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.favoriteRepository.findOne({
      where: { id: 'favorite-singleton-id' },
    });
    favorite.tracks.push(track.id);

    await this.favoriteRepository.save(favorite);
  }

  async addAlbum(id: UUID) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new EntityNotFoundException(
        Entity.ALBUM,
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.favoriteRepository.findOne({
      where: { id: 'favorite-singleton-id' },
    });
    favorite.albums.push(album.id);

    await this.favoriteRepository.save(favorite);
  }

  async addArtist(id: UUID) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new EntityNotFoundException(
        Entity.ARTIST,
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.favoriteRepository.findOne({
      where: { id: 'favorite-singleton-id' },
    });
    favorite.artists.push(artist.id);

    await this.favoriteRepository.save(favorite);
  }

  async removeTrack(id: UUID) {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: 'favorite-singleton-id' },
    });

    const trackIndex = favorite.tracks.findIndex((trackId) => trackId === id);

    if (trackIndex === -1) {
      throw new EntityNotFoundException(Entity.TRACK, id);
    }

    favorite.tracks.splice(trackIndex, 1);

    await this.favoriteRepository.save(favorite);

    return;
  }

  async removeAlbum(id: UUID) {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: 'favorite-singleton-id' },
    });

    const albumIndex = favorite.albums.findIndex((albumId) => albumId === id);

    if (albumIndex === -1) {
      throw new EntityNotFoundException(Entity.ALBUM, id);
    }

    favorite.albums.splice(albumIndex, 1);

    await this.favoriteRepository.save(favorite);

    return;
  }

  async removeArtist(id: UUID) {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: 'favorite-singleton-id' },
    });

    const artistIndex = favorite.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIndex === -1) {
      throw new EntityNotFoundException(Entity.ARTIST, id);
    }

    favorite.artists.splice(artistIndex, 1);

    await this.favoriteRepository.save(favorite);

    return;
  }
}
