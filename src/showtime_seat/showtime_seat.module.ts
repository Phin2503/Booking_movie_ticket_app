import { Module } from '@nestjs/common';
import { ShowtimeSeatController } from './showtime_seat.controller';
import { ShowtimeSeatService } from './showtime_seat.service';

@Module({
  controllers: [ShowtimeSeatController],
  providers: [ShowtimeSeatService],
})
export class ShowtimeSeatModule {}
