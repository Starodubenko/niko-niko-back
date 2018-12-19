import { Injectable } from '@nestjs/common';
import { User } from './entity';

@Injectable()
export class UserService {

  async getById(id: string): Promise<User> {
      return new Promise(resolve => {
        resolve(new User());
      });
  }
}
