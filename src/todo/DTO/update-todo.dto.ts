import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";

export enum Status {
  ACTIVE = 'active',
  ONGOING = 'ongoing',
}

export class UpdateTodoDto {

    @IsString()
    @IsNotEmpty()
    todo: string

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status

    @IsString()
    description: string

    @IsString()
    @IsNotEmpty()
    id: string

}