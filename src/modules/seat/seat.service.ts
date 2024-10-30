import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './seat.entity';
import { Theater } from '../theater/theater.entity';
import { CreatSeatDto } from './dtos/create.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async create(requestBody: CreatSeatDto) {
    const theaterExisting = await this.theaterRepository.findOneBy({
      id: requestBody.theaterId,
    });

    if (!theaterExisting) {
      throw new NotFoundException('Not found theater ! try again ...');
    }

    const existingSeat = await this.seatRepository.findOne({
      where: {
        seat_number: requestBody.seat_number,
        theater: {
          id: requestBody.theaterId,
        },
      },
    });

    if (existingSeat) {
      throw new BadRequestException(
        'Seat already exists in theater ! try again ... ',
      );
    }

    const newSeat = await this.seatRepository.create(requestBody);

    return await this.seatRepository.save(newSeat);
  }
}
