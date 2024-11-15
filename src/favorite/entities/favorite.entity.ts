import { Exclude } from 'class-transformer';
import { UUID } from 'src/utils/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Favorite {
  @Exclude()
  @PrimaryColumn({ default: 'favorite-singleton-id' })
  id: string;

  @Column('uuid', { array: true, default: [] })
  artists: UUID[];

  @Column('uuid', { array: true, default: [] })
  albums: UUID[];

  @Column('uuid', { array: true, default: [] })
  tracks: UUID[];
}
