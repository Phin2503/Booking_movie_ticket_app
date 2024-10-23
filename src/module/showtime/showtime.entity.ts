import { Movie } from 'src/module/movie/movie.entity';
import { Theater } from 'src/module/theater/theater.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  showtime: Date;

  @CreateDateColumn({
    type: 'datetime',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  update_at: Date;

  @ManyToOne(() => Movie, (movie) => movie.showtime)
  movie: Movie;

  @ManyToOne(() => Theater, (theater) => theater.showtime)
  theater: Theater;
}
