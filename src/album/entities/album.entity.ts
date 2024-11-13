import { Artist } from 'src/artist/entities/artist.entity';
import { UUID } from 'src/utils/types';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: UUID | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
