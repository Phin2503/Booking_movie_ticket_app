import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Theater } from '../theater/theater.entity';
import { SEAT_TYPE } from '../seat_type/seat_type';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seat_id: number;

  @Column({
    nullable: false,
    length: 10,
  })
  seat_number: string;

  @Column({
    type: 'enum',
    enum: SEAT_TYPE,
    default: SEAT_TYPE.NORMAL,
  })
  seat_type: SEAT_TYPE;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => Theater, (Theater) => Theater.seats)
  theater: Theater;
}
