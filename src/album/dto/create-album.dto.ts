import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'src/utils/types';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: UUID | null;
}
