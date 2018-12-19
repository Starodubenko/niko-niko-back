import { IsDateString, IsString } from 'class-validator';

export class UserMoodDto {

  @IsString()
  readonly mood: number;

  @IsString()
  readonly userId: string;

  @IsDateString()
  readonly date: string;

  constructor(mood: number, user: string, date: string) {
    this.mood = mood;
    this.userId = user;
    this.date = date;
  }
}
