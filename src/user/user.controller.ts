import { Body, Controller, Get, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // @Post()
  // create(@Body(
  //   new ValidationPipe()
  // ) createUserDto:CreateUserDto
  // ) {
  //   console.log(createUserDto)
  //   return this.userService.create(createUserDto)
  // }
  
  @Get()
  find(@Query() id) {
    console.log(id)
    return this.userService.getUserData(id)
  }

  @Put()
  update( @Body() data, @Query() id:string ) {}
}
