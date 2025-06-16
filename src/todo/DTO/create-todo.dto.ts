import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";

export enum Status {
  ACTIVE = 'active',
  ONGOING = 'ongoing',
}

export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    todo: string

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status

    @IsString()
    description: string

}