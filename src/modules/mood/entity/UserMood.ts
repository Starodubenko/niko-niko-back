import { User } from '../../user/entity';

export class UserMood {
  id: string;
  mood: number;
  user: User;
  date: Date;

  constructor(id: string, mood: number, user: User, date: Date) {
    this.id = id;
    this.mood = mood;
    this.user = user;
    this.date = date;
  }
}
