import { Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { User } from '../user/user.decorator';
import { getUserDataDto } from './DTO/getUserData.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Get()
  getTodo(@User() user ){
    console.log(user)
    return this.todoService.getTodo(user.sub)
  }

  @Post()
  create() {

  }

  @Put()
  updeat() {

  }

  @Delete()
  delete() {

  }


}
