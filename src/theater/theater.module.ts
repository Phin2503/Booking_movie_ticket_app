import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { Theater } from './theater.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Theater])],
  controllers: [TheaterController],
  providers: [TheaterService],
  exports: [TypeOrmModule],
})
export class TheaterModule {}
