import { Exclude } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

import { ROLES } from 'src/roles/roles';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30,
    unique: true,
  })
  username: string;

  @Column({
    length: 155,
    update: true,
  })
  @Exclude()
  password: string;

  @Column({
    length: 30,
  })
  fullName: string;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ type: Date })
  @IsDate()
  dateOfBirth: Date;

  @Column({
    length: 20,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    update: false,
  })
  createAt: Date;

  @Column()
  @IsOptional()
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ default: ROLES.USER })
  role: ROLES;
}
