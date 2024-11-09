import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from './entities/artist.entity';
import { UUID } from 'src/database/database.types';

export class ArtistNotFoundException extends HttpException {
  constructor(id) {
    super(`Artist with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist({
      id: uuid(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    this.databaseService.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.databaseService.artists;
  }

  findOne(id: UUID) {
    const artist = this.databaseService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) {
      throw new ArtistNotFoundException(id);
    }
    return artist;
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.databaseService.artists.findIndex(
      (artist) => artist.id === id,
    );
    const artist = this.databaseService.artists[artistIndex];

    if (!artist) {
      throw new ArtistNotFoundException(id);
    }

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    this.databaseService.artists.splice(artistIndex, 1, updatedArtist);

    return updatedArtist;
  }

  remove(id: UUID) {
    const artistIndex = this.databaseService.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex === -1) {
      throw new ArtistNotFoundException(id);
    }

    const artist = this.databaseService.artists[artistIndex];

    const updatedTracks = this.databaseService.tracks.map((track) =>
      track.artistId === artist.id ? { ...track, artistId: null } : track,
    );

    const updatedAlbums = this.databaseService.albums.map((album) =>
      album.artistId === artist.id ? { ...album, artistId: null } : album,
    );

    this.databaseService.artists.splice(artistIndex, 1);
    this.databaseService.tracks = updatedTracks;
    this.databaseService.albums = updatedAlbums;
    return;
  }
}
