import { User } from '../../user/entity/User';

export class UserMood {
  mood: number;
  user: User;
  date: Date;

  constructor(mood: number, user: User, date: Date) {
    this.mood = mood;
    this.user = user;
    this.date = date;
  }
}
