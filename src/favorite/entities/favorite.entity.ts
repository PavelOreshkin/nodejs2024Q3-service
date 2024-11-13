import { Exclude } from 'class-transformer';
import { IsArray, IsUUID } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { UUID } from 'src/utils/types';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Favorite {
  @Exclude()
  @PrimaryColumn({ default: 'favorite-singleton-id' })
  id: string;
  // @Column()
  // @IsArray()
  // @IsUUID()
  @Column('uuid', { array: true })
  artists: UUID[];

  // @Column()
  // @IsArray()
  // @IsUUID()

  @Column('uuid', { array: true })
  albums: UUID[];

  // @Column()
  // @IsArray()
  // @IsUUID()
  @Column('uuid', { array: true })
  tracks: UUID[];
}
