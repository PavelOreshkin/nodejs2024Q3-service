import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'src/utils/types';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsInt()
  duration: number;

  @IsUUID()
  @IsOptional()
  artistId: UUID | null;

  @IsUUID()
  @IsOptional()
  albumId: UUID | null;
}
