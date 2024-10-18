import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { CloudinaryService } from 'src/configs/cloudinary.service';
import { CloudinaryModule } from 'src/configs/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), CloudinaryModule],
  controllers: [MovieController],
  providers: [MovieService, CloudinaryService],
  exports: [TypeOrmModule],
})
export class MovieModule {}
