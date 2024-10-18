import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { SanitizeInput } from 'src/guards/sanitizeInput.guard';

export class LoginDto extends SanitizeInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 155, { message: 'password must be from 8 character or more' })
  password: string;

  sanitize() {
    this.password = this.sanitizeInput(this.password);
  }
}
