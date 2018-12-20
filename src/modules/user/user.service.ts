import { Injectable } from '@nestjs/common';
import { User } from './entity';

@Injectable()
export class UserService {
    private userArray = [
        new User('1', 'John', 'Doe', 'Team_One'),
        new User('1', 'John', 'Doe', 'Team_One'),
        new User('2', 'Michael', 'Smith', 'Team_Two'),
        new User('3', 'Colin', 'Barker', 'Team_Three'),
    ];

  async getById(id: string): Promise<User> {
      return new Promise(resolve => {
        resolve(this.userArray.filter(user => user.id === id)[0] || null);
      });
  }
}
