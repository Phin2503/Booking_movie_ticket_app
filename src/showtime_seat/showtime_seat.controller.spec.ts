import { Test, TestingModule } from '@nestjs/testing';
import { ShowtimeSeatController } from './showtime_seat.controller';

describe('ShowtimeSeatController', () => {
  let controller: ShowtimeSeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowtimeSeatController],
    }).compile();

    controller = module.get<ShowtimeSeatController>(ShowtimeSeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
