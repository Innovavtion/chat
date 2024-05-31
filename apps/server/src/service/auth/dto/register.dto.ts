import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  ValidateIf,
  IsIn,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  login: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  @IsIn([], { message: 'Passwords do not match' })
  @ValidateIf((o) => o.password !== o.passwordRepeat)
  passwordRepeat: string;
}
