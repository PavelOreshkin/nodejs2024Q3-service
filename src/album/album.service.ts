import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { UUID } from 'src/database/database.types';
import { Entity, EntityNotFoundException } from 'src/utils/customExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(newAlbum);
  }

  findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: UUID) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new EntityNotFoundException(Entity.ALBUM, id);
    return album;
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new EntityNotFoundException(Entity.ALBUM, id);
    Object.assign(album, updateAlbumDto);
    return this.albumRepository.save(album);
  }

  async remove(id: UUID) {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
    if (!album) throw new EntityNotFoundException(Entity.ALBUM, id);
    await this.albumRepository.remove(album);
    return;
  }
}
