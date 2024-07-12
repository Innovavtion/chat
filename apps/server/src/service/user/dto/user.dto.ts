import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserUpdateNameDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  lastName: string;
}

export class UserUpdateEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
