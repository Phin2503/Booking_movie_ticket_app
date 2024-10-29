import { Module } from '@nestjs/common';
import { SeatReservationController } from './seat_reservation.controller';
import { SeatReservationService } from './seat_reservation.service';

@Module({
  controllers: [SeatReservationController],
  providers: [SeatReservationService],
})
export class SeatReservationModule {}
