import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { User } from '../user/user.decorator';
import { getUserDataDto } from './DTO/getUserData.dto';
import { CreateTodoDto } from './DTO/create-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';



@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodo(@User() user ){
    // console.log(user)
    return this.todoService.getTodo(user.sub)
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) todo: CreateTodoDto,
    @User() user
  ) {
    let createTodoServise = await this.todoService.create(todo, user.id)
    return createTodoServise
  }

  @Put()
  async updeat(
    @Body(new ValidationPipe()) todo: UpdateTodoDto,
    @User() user
  ) {
    let updateTodoServise = await this.todoService.update(todo, user.id)
    return updateTodoServise
  }

  @Delete()
  delete() {

  }


}
