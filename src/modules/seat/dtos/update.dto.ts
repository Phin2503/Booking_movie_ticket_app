import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { SEAT_TYPE } from 'src/modules/seat_type/seat_type';

export class UpdateSeatDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  seat_number: string;

  @IsNotEmpty()
  @IsEnum(SEAT_TYPE)
  seat_type: SEAT_TYPE;

  @IsNotEmpty()
  @IsNumber()
  theaterId: number;
}
