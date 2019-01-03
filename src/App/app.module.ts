import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MoodModule} from '../modules/mood/mood.module';

@Module({
  imports: [MoodModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
