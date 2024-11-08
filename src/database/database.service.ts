import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseService {
  // constructor() {
  //   // this.users = [];
  //   const users = [];
  // }

  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
}
