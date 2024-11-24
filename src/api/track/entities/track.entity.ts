import { Album } from 'src/api/album/entities/album.entity';
import { Artist } from 'src/api/artist/entities/artist.entity';
import { UUID } from 'src/utils/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: UUID | null;

  @Column({ nullable: true })
  albumId: UUID | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album | null;
}
