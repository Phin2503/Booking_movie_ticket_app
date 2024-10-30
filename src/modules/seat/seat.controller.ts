import { Body, Controller, Post } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreatSeatDto } from './dtos/create.dto';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post('create')
  createSeat(@Body() requestBody: CreatSeatDto) {
    return this.seatService.create(requestBody);
  }
}
