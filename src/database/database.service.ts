import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseService {
  // constructor() {
  //   // this.users = [];
  //   const users = [];
  // }

  users: User[] = [];
}
