import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { SanitizeInput } from 'src/guards/sanitizeInput.guard';

export class RegisterDto extends SanitizeInput {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least one special character',
  })
  reTypePassword: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, {
    message: 'Phone number is not valid',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  sanitize() {
    this.password = this.sanitizeInput(this.password);
  }
}
