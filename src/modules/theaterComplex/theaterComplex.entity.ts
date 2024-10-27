import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Theater } from '../theater/theater.entity';

@Entity()
export class TheaterComplex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  location: string;

  @Column({
    nullable: false,
  })
  address: string;

  @OneToMany(() => Theater, (theater) => theater.theater_complex)
  theaters: Theater[];
}
