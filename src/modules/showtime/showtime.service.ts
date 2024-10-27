import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from './showtime.entity';

import { Theater } from '../theater/theater.entity';
import { Movie } from '../movie/movie.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { CreateShowtimeDto } from './dtos/create.dto';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async createShowtime(requestBody: CreateShowtimeDto) {
    const movie = await this.movieRepository.findOneBy({
      id: requestBody.movieId,
    });
    const theater = await this.theaterRepository.findOneBy({
      id: requestBody.theaterId,
    });

    const showtimeStart = new Date(requestBody.showtime_start);

    // Kiểm tra xem thời gian bắt đầu có hợp lệ không
    if (isNaN(showtimeStart.getTime())) {
      throw new BadRequestException('Invalid date value for showtime_start.');
    }

    if (showtimeStart.getDate < new Date().getDate)
      throw new BadRequestException('Cannot add showtimes to past dates');
    if (!movie) throw new NotFoundException('Not found movie !');
    if (!theater) throw new NotFoundException('Not found theater !');

    const duration = movie.duration;
    const bufferTime = 15;

    const showtimeEnd = new Date(
      showtimeStart.getTime() + (duration + bufferTime) * 60000,
    );

    const existingShowtime = await this.showtimeRepository.find({
      where: {
        theater: {
          id: theater.id,
        },
        showtime_end: MoreThanOrEqual(this.convertUTCToHCM(showtimeStart)),
        showtime_start: LessThanOrEqual(this.convertUTCToHCM(showtimeEnd)),
      },
    });

    if (existingShowtime.length > 0)
      throw new BadRequestException(
        "Showtime overlaps with another schedule in this theater.',",
      );

    const newShowtime = this.showtimeRepository.create({
      showtime_start: this.convertUTCToHCM(requestBody.showtime_start),
      showtime_end: this.convertUTCToHCM(showtimeEnd),
      movie,
      theater,
    });

    return this.showtimeRepository.save(newShowtime);
  }

  convertUTCToHCM(utcDate: Date): Date {
    // Nếu utcDate là chuỗi, chuyển đổi sang Date
    const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;

    // Kiểm tra xem date có hợp lệ không
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date value.');
    }

    // Thêm 7 giờ cho múi giờ Việt Nam
    const hcmDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return hcmDate;
  }
}
