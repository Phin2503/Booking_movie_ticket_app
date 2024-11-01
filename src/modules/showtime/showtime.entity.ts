import { Movie } from 'src/modules/movie/movie.entity';
import { Theater } from 'src/modules/theater/theater.entity';
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
    type: 'datetime',
  })
  showtime_start: Date;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  showtime_end: Date;

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
