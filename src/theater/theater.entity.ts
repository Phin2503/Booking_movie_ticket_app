import { Showtime } from 'src/showtime/showtime.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  location: string;

  @CreateDateColumn({
    type: 'datetime',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  update_at: Date;

  @OneToMany(() => Showtime, (Showtime) => Showtime.theater)
  showtime: Showtime[];
}
