import { IsDateString, IsString } from 'class-validator';

export class ShortUserMoodDto {
    @IsString()
    readonly moodLevel: number;

    @IsString()
    readonly userId: string;

    constructor(mood: number, userId: string) {
        this.moodLevel = mood;
        this.userId = userId;
    }
}

export class UserMoodDto extends ShortUserMoodDto {

  @IsDateString()
  readonly date: string;

  constructor(moodLevel: number, userId: string, date: string) {
    super(moodLevel, userId);
    this.date = date;
  }
}
