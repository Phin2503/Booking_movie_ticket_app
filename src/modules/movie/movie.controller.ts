import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMovieDTO } from './dtos/create.dto';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  createMovie(
    @Body() requestBody: CreateMovieDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(requestBody, file);
    return this.movieService.create(requestBody, file);
  }

  @Put('/update/:id')
  updateMovie(@Body() requestBody: Movie, @Param('id') id: number) {
    return this.movieService.update(requestBody, id);
  }

  @Delete('/delete/:id')
  deleteMovie(@Param('id') id: number) {
    return this.movieService.delete(id);
  }

  @Get('/:id')
  findMovieById(@Param('id') id: number) {
    return this.movieService.findMovie(id);
  }

  @Get('')
  findAllMovie(pagination?: PaginationDTO) {
    if (!pagination) {
      pagination = {
        skip: 1,
        limit: 10,
      };
    }
    return this.movieService.findAll(pagination);
  }
}