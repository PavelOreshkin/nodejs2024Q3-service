import { IsUUID } from 'class-validator';
import { UUID } from 'src/utils/types';

export class GetUserDto {
  @IsUUID()
  id: UUID;
}
