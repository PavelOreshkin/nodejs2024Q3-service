import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'src/database/database.types';
import { Entity, EntityNotFoundException } from 'src/utils/customExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: UUID) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new EntityNotFoundException(Entity.ARTIST, id);
    return artist;
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new EntityNotFoundException(Entity.ARTIST, id);
    Object.assign(artist, updateArtistDto);
    return this.artistRepository.save(artist);
  }

  async remove(id: UUID) {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
    if (!artist) throw new EntityNotFoundException(Entity.ARTIST, id);
    await this.artistRepository.remove(artist);
    return;
  }
}
