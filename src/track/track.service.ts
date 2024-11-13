import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { UUID } from 'src/utils/types';
import { Entity, EntityNotFoundException } from 'src/utils/customExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(newTrack);
  }

  findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: UUID) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new EntityNotFoundException(Entity.TRACK, id);
    return track;
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new EntityNotFoundException(Entity.TRACK, id);
    Object.assign(track, updateTrackDto);
    return this.trackRepository.save(track);
  }

  async remove(id: UUID) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new EntityNotFoundException(Entity.TRACK, id);
    await this.trackRepository.remove(track);
    return;
  }
}
