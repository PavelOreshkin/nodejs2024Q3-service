import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { Album } from './entities/album.entity';
import { UUID } from 'src/database/database.types';

export class AlbumNotFoundException extends HttpException {
  constructor(id) {
    super(`Album with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album({
      id: uuid(),
      name: createAlbumDto.name,
      artistId: createAlbumDto.artistId,
      year: createAlbumDto.year,
    });
    this.databaseService.albums.push(album);
    return album;
  }

  findAll() {
    return this.databaseService.albums;
  }

  findOne(id: UUID) {
    const album = this.databaseService.albums.find((album) => album.id === id);
    if (!album) {
      throw new AlbumNotFoundException(id);
    }
    return album;
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.databaseService.albums.findIndex(
      (album) => album.id === id,
    );
    const album = this.databaseService.albums[albumIndex];

    if (!album) {
      throw new AlbumNotFoundException(id);
    }

    const updatedAlbum: Album = {
      ...album,
      ...updateAlbumDto,
    };

    this.databaseService.albums.splice(albumIndex, 1, updatedAlbum);

    return updatedAlbum;
  }

  remove(id: UUID) {
    const albumIndex = this.databaseService.albums.findIndex(
      (album) => album.id === id,
    );

    if (albumIndex === -1) {
      throw new AlbumNotFoundException(id);
    }

    const album = this.databaseService.albums[albumIndex];

    const newTracks = this.databaseService.tracks.map((track) =>
      track?.albumId === album.id ? { ...track, albumId: null } : track,
    );
    this.databaseService.tracks = [...newTracks];

    this.databaseService.albums.splice(albumIndex, 1);
    return;
  }
}
