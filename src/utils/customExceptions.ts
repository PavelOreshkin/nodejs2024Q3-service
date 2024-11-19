import { HttpException, HttpStatus } from '@nestjs/common';
import { UUID } from 'src/utils/types';

export enum Entity {
  USER = 'User',
  ARTIST = 'Artist',
  ALBUM = 'Album',
  TRACK = 'Track',
}

export class EntityNotFoundException extends HttpException {
  constructor(entity: Entity, id: UUID, statusCode?: HttpStatus) {
    super(
      `${entity} with ID ${id} not found`,
      statusCode || HttpStatus.NOT_FOUND,
    );
  }
}
