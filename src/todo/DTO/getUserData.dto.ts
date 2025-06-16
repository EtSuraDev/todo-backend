import { IsEmail, IsString } from 'class-validator';

export class getUserDataDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}