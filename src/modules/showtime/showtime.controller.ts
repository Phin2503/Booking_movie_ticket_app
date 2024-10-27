import { Body, Controller, Post } from '@nestjs/common';

import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dtos/create.dto';

@Controller('showtime')
export class ShowtimeController {
  constructor(private showtimeService: ShowtimeService) {}

  @Post('/create')
  createShowtime(@Body() requestBody: CreateShowtimeDto) {
    return this.showtimeService.createShowtime(requestBody);
  }
}
