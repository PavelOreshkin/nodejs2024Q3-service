import { IsUUID } from 'class-validator';
import { UUID } from 'src/database/database.types';

export class GetUserDto {
  @IsUUID()
  id: UUID;
}
