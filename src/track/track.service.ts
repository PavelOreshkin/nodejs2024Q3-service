import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { Track } from './entities/track.entity';
import { UUID } from 'src/database/database.types';

export class TrackNotFoundException extends HttpException {
  constructor(id) {
    super(`Track with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const track = new Track({
      id: uuid(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      albumId: createTrackDto.albumId,
      artistId: createTrackDto.artistId,
    });
    this.databaseService.tracks.push(track);
    return track;
  }

  findAll() {
    return this.databaseService.tracks;
  }

  findOne(id: UUID) {
    const track = this.databaseService.tracks.find((track) => track.id === id);
    if (!track) {
      throw new TrackNotFoundException(id);
    }
    return track;
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.databaseService.tracks.findIndex(
      (track) => track.id === id,
    );
    const track = this.databaseService.tracks[trackIndex];

    if (!track) {
      throw new TrackNotFoundException(id);
    }

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.databaseService.tracks.splice(trackIndex, 1, updatedTrack);

    return updatedTrack;
  }

  remove(id: UUID) {
    const trackIndex = this.databaseService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (trackIndex === -1) {
      throw new TrackNotFoundException(id);
    }

    this.databaseService.tracks.splice(trackIndex, 1);
    return;
  }
}
